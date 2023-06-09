import passport from 'passport'
import local from 'passport-local'
import github from 'passport-github2'
import jwt from 'passport-jwt'
import { createHash, isValidPassword } from '../utils/bcrypt.utils.js'
import { getDaos } from '../models/daos/factory.js'
import { logError } from '../utils/console.utils.js'
import { cookieExtractor } from '../utils/session.utils.js'
import ENV from './env.config.js'
import { CreateUserDTO, GetUserDTO } from '../models/dtos/users.dto.js'

const { SECRET_KEY, ADMIN_NAME, ADMIN_PASSWORD, GITHUB: { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET } } = ENV

const { cartsDao, usersDao } = getDaos()

const LocalStrategy = local.Strategy
const GithubStrategy = github.Strategy
const JwtStrategy = jwt.Strategy

const ExtractJWT = jwt.ExtractJwt

export const initializePassport = () => {
    //Local Register
    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
            const { firstName, lastName, email, age } = req.body
            if (!firstName || !lastName || !age || !email || !password) {
                req.logger.error('Missing fields')
                return done(null, false)
            }
            try {
                const user = await usersDao.getUserByEmail(username)
                if (user) {
                    req.logger.error('Unable to create user, email already registered')
                    return done(null, false, 'Unable to create user, email already registered')
                }
                const cart = await cartsDao.createCart()
                const newUser = {
                    firstName,
                    lastName, 
                    email,
                    age,
                    password: createHash(password),
                    cart: cart._id,
                    lastConnection: new Date(),
                    documents: [],
                    status: false
                }
                if (req.file) {
                    const paths = {
                        path: req.file.path,
                        originalName: req.file.originalname
                    }
                    newUser.profilePic = paths
                }
                const userPayload = new CreateUserDTO(newUser)
                console.log(userPayload)
                let result = await usersDao.createUser(userPayload)
                req.logger.info(`New user registered. ID: ${result._id} `)
                return done(null, result)
            } catch (error) {
                req.logger.error('Error getting user: ' + error)
                return done('Error getting user: ' + error)
            }
        }

    )),
        //Local Login
        passport.use('login', new LocalStrategy(
            { usernameField: 'email' },
            async (username, password, done) => {
                try {
                    if (username === ADMIN_NAME && password === ADMIN_PASSWORD) {
                        const user = {
                            first_name: 'Admin',
                            last_name: 'Coder',
                            email: ADMIN_NAME,
                            password: ADMIN_PASSWORD,
                            role: 'admin',
                            cart: '640e0351f496d9111957b2de'
                        }
                        return done(null, user)
                    }
                    const user = await usersDao.getUserByEmail(username)
                    if (!user) {
                        return done(null, false, 'user not found')
                    }
                    if (!isValidPassword(user, password)) {
                        return done(null, false, 'wrong user or password')
                    }
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        ))

    //Github Strategy
    passport.use(
        new GithubStrategy({
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: CALLBACK_URL
        },
            async (accessToken, refreshToken, profile, done) => {
                const userData = profile._json
                try {
                    const user = await usersDao.getUserByEmail(userData.email)
                    if (!user) {
                        const cart = await cartsDao.createCart()
                        const newUser = {
                            firstName: userData.name.split(' ')[0],
                            lastName: userData.name.split(' ')[1],
                            age: userData.age || 0,
                            email: userData.email || ' ',
                            password: ' ',
                            githubLogin: userData.login,
                            cart: cart._id
                        }
                        const userPayload = new CreateUserDTO(newUser)
                        const response = await usersDao.createUser(userPayload)
                        const finalUser = response._doc
                        done(null, finalUser)
                        return
                    }
                    done(null, user)
                } catch (error) {
                    logError('Github login error: ' + error);
                    done(error)
                }
            }
        ))

    // JWT
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET_KEY
    }, async (jwt_payload, done) => {
        try {
            const userPayload = new GetUserDTO(jwt_payload)
            return done(null, userPayload)
        } catch (error) {
            return done(error)
        }
    }
    ))
}

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await usersDao.getUserById(id)
    done(null, user);
});