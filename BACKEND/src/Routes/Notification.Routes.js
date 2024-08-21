const SellerNotification = require('../Controller/Notification.js/Seller.Notification')
const Product = require('../Controller/Products_API/product.Corntroller')

const APP = require('express')
const NotificationRoutes = APP.Router()
NotificationRoutes.route('/notification').post(SellerNotification.postNotification)
module.exports = NotificationRoutes
