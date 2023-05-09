import express from 'express'
import ENV from './config/env.config.js'

const app = express()

app.listen(ENV.PORT, () => console.log('server is running on port', ENV.PORT))