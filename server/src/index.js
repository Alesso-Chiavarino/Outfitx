import app from './server.js'
import cluster from 'cluster'
import { logSuccess, logError } from './utils/console.utils.js'
import { cpus } from 'os'
import ENV from './config/env.config.js'

const { PORT } = ENV

if (cluster.isPrimary) {
    for (let i = 0; i < cpus().length; i++) {
        cluster.fork()
    }
} else {
    const server_url = `http://localhost:${PORT}`
    const server = app.listen(PORT, () => logSuccess(`server is running in ${server_url}`))


    server.on("error", (error) => {
        logError("There was an error starting the server");
        logError(error);
    });
}