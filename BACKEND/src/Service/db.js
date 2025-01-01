/* eslint-disable no-console */
import mongoose from 'mongoose';
import { config } from '../Utils/config.js';
import logger from '../Utils/logger.js';

const db = async () => {
    try {
        const api = config.get('_URLLocal');
        const clientOptions = {
            serverApi: { version: '1', strict: true, deprecationErrors: true }
        };
        await mongoose.connect(api, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        logger.info('sucessfully connect', {
            meta: {
                Message: 'Database Connection Sucessfull'
            }
        });
    } catch (err) {
        logger.info(err);
    }
};
export default db;
