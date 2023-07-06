import { CartsService } from '../services/carts.service.js'
import { ProductsService } from '../services/products.service.js'
import TicketsService from '../services/tickets.service.js'
import { UsersService } from '../services/users.service.js'

const productsService = new ProductsService()
const cartsService = new CartsService()
const ticketsService = new TicketsService()
const usersService = new UsersService()

export class ViewsController {

    static async register(req, res, next) {
        res.render('register', {
            title: 'Outfitx | Sign Up',
            styles: 'register.css'
        })
    }

    static async login(req, res, next) {
        res.render('login', {
            title: 'Outfitx | Login',
            styles: 'login.css'
        })
    }

    static async recover(req, res, next) {
        res.render('recover', {
            title: 'Outfitx | Recover your password',
            styles: 'recover.css'
        })
    }

    static async products(req, res, next) {
        const { user } = req
        const { limit, page, query, sort } = req.query
        const protocol = req.protocol
        const host = req.get('host')
        try {
            const products = await productsService.getProducts(limit, page, query, sort, protocol, host)
            const admin = user.role === 'admin'
            let cart
            if (!admin) {
                cart = await cartsService.getCartById(user.cart)
            }
            const premium = user.role === 'premium'
            res.render('index', {
                title: "Outfitx",
                styles: "index.css",
                products,
                user,
                cart,
                admin,
                premium,
            })
        } catch (error) {
            next(error)
        }
    }

    static async productDetail(req, res, next) {
        const { user } = req
        const { pid } = req.params
        try {
            const admin = user.role === 'admin'
            let cart
            if (!admin) {
                cart = await cartsService.getCartById(user.cart)
            }
            const product = await productsService.getProductById(pid)
            res.render('productDetail', {
                title: 'Outfitx | ' + product.title,
                product,
                cart,
                user,
                admin
            })
        } catch (error) {
            next(error)
        }
    }

    static async cart(req, res, next) {
        const { cid } = req.params
        const { user } = req

        try {
            const cart = await cartsService.getCartById(cid)
            const admin = user.role === 'admin'

            const subtotal = cart.products.map(prod => {
                return prod.product.price * prod.quantity
            })

            res.render('cart', {
                title: "Outfitx | Cart",
                user,
                cart,
                subtotal,
                admin
            })
        } catch (error) {
            next(error)
        }
    }

    static async users(req, res, next) {
        const { user } = req
        try {
            const admin = user.role === 'admin'
            const usersList = await usersService.getUsers()
            const usersQuantity = usersList.length
            res.render('users', {
                title: "Outfitx | Users",
                usersList,
                usersQuantity,
                user,
                admin
            })

        } catch (error) {
            next(error)

        }
    }

    static async profile(req, res, next) {
        const { user } = req
        const { uid } = req.params
        try {
            const userData = await usersService.getUserById(uid)
            res.render('profile', {
                title: "Outfitx | Profile",
                user,
                userData
            })
        } catch (error) {
            next(error)
        }
    }

    static async newProduct(req, res, next) {
        const { user } = req
        try {
            const admin = user.role === 'admin'
            res.render('newProduct', {
                title: "Outfitx | Create Product",
                user,
                admin
            })
        } catch (error) {
            next(error)
        }

    }

    static async ticket(req, res, next) {
        const { user } = req
        const { tid } = req.params
        const name = user.firstName + ' ' + user.lastName
        try {
            const ticket = await ticketsService.getTicketById(tid)
            res.render('ticket', {
                title: "Outfitx | Purchase Ticket",
                name,
                ticket,
                user
            })
        } catch (error) {
            next(error)
        }
    }

    static async passwordForm(req, res, next) {
        const { token } = req.query
        try {
            res.render('newPasswordForm', {
                title: "Outfitx | Generate new Password",
                token
            })
        } catch (error) {
            next(error)
        }
    }

    static async purchaseSuccess(req, res, next) {

        const { cid } = req.params

        try {
            res.render('purchaseSuccess', {
                title: "Outfitx | Purchase Success",
                cid
            })
        } catch (error) {
            next(error)
        }
    }
}