import SellerNotification from '../Controller/Seller.Notification.js';
// import Product from '../Controller/product.Corntroller.js'

import APP from 'express';
const NotificationRoutes = APP.Router();
NotificationRoutes.route('/notification').post(SellerNotification.postNotification);
export default NotificationRoutes;
