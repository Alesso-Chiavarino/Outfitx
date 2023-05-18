import express from 'express'
import ENV from './config/env.config.js'
import cors from 'cors'
import { Server } from 'socket.io'
import { logError, logSuccess } from './utils/console.utils.js'
import apiRouter from './routers/app.routes.js'
import { addLogger } from './middlewares/logger.middleware.js'
import swaggerJsDoc from 'swagger-jsdoc'
import { serve as swaggerServe, setup as swaggerSetup } from 'swagger-ui-express'

const app = express()

const { PORT } = ENV

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Outfitx API',
            description: 'Ecommerce API',
            version: '1.0.0',
            contact: {
                name: 'Alessandro Chiavarino',
                url: 'https://portafolio-alessandro-chiavarino.vercel.app',
                email: 'alessochiavarino@gmail.com'
            }
        },
    },
    apis: [`${process.cwd()}/src/docs/**/*.yml`]
};

const specs = swaggerJsDoc(swaggerOptions)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(addLogger)
app.use('/api', apiRouter)
app.use('/api/doc', swaggerServe, swaggerSetup(specs))

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