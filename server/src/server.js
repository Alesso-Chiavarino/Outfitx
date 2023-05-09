import express from 'express'
import ENV from './config/env.config.js'
import cors from 'cors'
import errorHandler from './middlewares/error.middleware.js'
import { Server } from 'socket.io'
import { logError, logSuccess } from './utils/console.utils.js'

const app = express()

const { PORT } = ENV

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)
app.use(cors({
    origin: 'http://localhost:3000',
}))

const server = app.listen(PORT, () => logSuccess(`server is running on port ${PORT}`))

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