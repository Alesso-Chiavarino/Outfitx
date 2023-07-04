import express from 'express'
import ENV from './src/config/env.config.js'
import cors from 'cors'
import { Server } from 'socket.io'
import { logError, logSuccess } from './src/utils/console.utils.js'
import apiRouter from './src/routers/app.routes.js'
import { addLogger } from './src/middlewares/logger.middleware.js'
import { serve as swaggerServe, setup as swaggerSetup } from 'swagger-ui-express'
import { specs } from './src/config/swagger.config.js'
import handlebars from 'express-handlebars'
import helpers from 'handlebars-helpers'
import path from 'path'
import __dirname from './src/utils/dirname.utils.js'
import passport from 'passport'
import { initializePassport } from './src/config/passport.config.js'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'
import viewsRouter from './src/routers/views/views.routes.js'

const app = express()

const { PORT } = ENV

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(addLogger)
app.use('/api', apiRouter)
app.use('/', viewsRouter)
app.use('/api/doc', swaggerServe, swaggerSetup(specs))
app.use('/statics', express.static(path.resolve(__dirname, '../../public')))
initializePassport()
app.use(passport.initialize())
app.use(flash())

//views
const math = helpers.math();
app.engine('handlebars', handlebars.engine({
    helpers: {
        math
    }
}))
app.set('views', path.resolve(__dirname, '../views'));

app.set('view engine', 'handlebars');

const server_url = `http://localhost:${PORT}`
const server = app.listen(PORT, () => logSuccess(`server is running in ${server_url}`))

server.on("error", (error) => {
    logError("There was an error starting the server");
    logError(error);
});

const io = new Server(server)

io.on('connection', (socket) => {
    logSuccess("new client connected");
    app.set('socket', socket)
    app.set('io', io)
    // socket.on('login', user => {
    //     socket.emit('welcome', user)
    //     socket.broadcast.emit('new-user', user)
    // })
})

export default app