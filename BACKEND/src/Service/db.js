import mongoose from 'mongoose'
import { config } from '../Utils/config.js'

const db = async () => {
    try {
        const api = config.get('_URLLocal')
        const clientOptions = {
            serverApi: { version: '1', strict: true, deprecationErrors: true }
        }
        await mongoose.connect(api, clientOptions)
        await mongoose.connection.db.admin().command({ ping: 1 })
        console.log('sucessfully connect')
    } catch (err) {
        console.log(err)
    }
}
export default db
