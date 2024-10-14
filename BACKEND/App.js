import 'dotenv/config'
// import dotenv from 'dotenv'
// dotenv.config({ path: `.env.${process.env.NODE_ENV}`, override: true })
import './src/Service/servers.js'
import db from './src/Service/db.js'
import express from 'express'
import cors from 'cors'
import PublicRouter from './src/Routes/Public.Auth.Routes.js'
import SellerRoutes from './src/Routes/Seller.Auth.Routes.js'
import helmet from 'helmet'
import SellerProductRoutes from './src/Routes/Seller.Product.Routes.js'
import ProductRouter from './src/Routes/Public.Product.Routes.js'
import { config } from './src/Utils/config.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
import NotificationRoutes from './src/Routes/Notification.Routes.js'
import socketServer from './src/Utils/Socket.io.Server.js'
import errorHandler from './src/Middleware/error.MiddkerWare.js'
import logger from './src/Utils/logger.js'
import DeveloperRoute from './src/Routes/Developer.Routes.js'
const app = express()
app.use(helmet())
app.set('trust proxy', 1)
app.use(express.urlencoded({ extended: true }))
const httpServer = createServer(app)
// ############ cache control ###########
// app.use(function (req, res, next) {
//     res.setHeader('Cache-Control', 'no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0, max-age=3600')
//     next()
// })
// ########### user cors policy ###############
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200
    })
)
app.use(express.json())
// product routes
app.use('/', DeveloperRoute)
// product routes
app.use('/products/v1', ProductRouter)
// public routes
app.use('/public', PublicRouter)
// seller Routes
app.use('/seller', SellerRoutes)
// seller Routes
app.use('/seller/products/v1', SellerProductRoutes)
// Notificatios Routes
app.use('/notificatios', NotificationRoutes)
// error handler
app.use(errorHandler)
// listion server on port 3031
db().then(() => {
    httpServer.listen(config.get('_PORT'), () =>
        logger.info('CONNECTION', {
            meta: {
                port: config.get('_PORT'),
                serverUrl: `http://localhost:${config.get('_PORT')}`
            }
        })
    )
    const io = new Server(httpServer)
    socketServer(io)
})
