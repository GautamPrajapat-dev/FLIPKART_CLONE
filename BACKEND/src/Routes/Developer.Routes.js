import APP from 'express'
import quicker from '../Utils/quicker.js'
import moment from 'moment'
const DeveloperRoute = APP.Router()
DeveloperRoute.route('/helth').get((req, res) => {
    try {
        const helthData = {
            application: quicker.getApplicationHelth(),
            system: quicker.getSystemHelth(),
            timestamp: moment.utc().format('YYYY-MM-DD')
        }
        res.status(200).json({ success: true, helthData })
    } catch (error) {
        console.log(error)
    }
})
DeveloperRoute.route('/').get((req, res) => {
    res.status(200).json({ success: true, path: req.path, quicker: quicker.getApplicationHelth() })
})
export default DeveloperRoute
