import APP from 'express';
import quicker from '../Utils/quicker.js';
import moment from 'moment';
import logger from '../Utils/logger.js';
const DeveloperRoute = APP.Router();
DeveloperRoute.route('/helth').get((req, res) => {
    try {
        const helthData = {
            application: quicker.getApplicationHelth(),
            system: quicker.getSystemHelth(),
            timestamp: moment.utc().format('YYYY-MM-DD')
        };
        res.status(200).json({ success: true, helthData });
    } catch (error) {
        logger.log(error);
    }
});
DeveloperRoute.route('/').get((req, res) => {
    res.status(200).json({ success: true, path: req.path, quicker: quicker.getApplicationHelth() });
});
export default DeveloperRoute;
