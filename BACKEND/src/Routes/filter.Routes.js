import { filterController } from '../Controller/filter.Controller.js'

import APP from 'express'
const FilterRoute = APP.Router()
FilterRoute.route('/').get(filterController.filter)
export default FilterRoute
