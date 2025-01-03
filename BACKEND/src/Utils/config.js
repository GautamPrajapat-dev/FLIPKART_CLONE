/* eslint-disable no-console */

import logger from './logger.js';

/* eslint-disable no-undef */
const _config = {
    _PORT: process.env.PORT,
    _URI: process.env.URI,
    _URLLocal: process.env.URLLocal,
    _SECRET_KEY: process.env.SECRET_KEY,
    _MAILLER_HOST: process.env.MAILLER_HOST,
    _MAILLER_PORT: process.env.MAILLER_PORT,
    _MAILLER_USER: process.env.MAILLER_USER,
    _MAILLER_PASS: process.env.MAILLER_PASS,
    _CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    _CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    _CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
};

export const config = {
    get(key) {
        const value = _config[key];
        if (!value) {
            logger.log(`The ${key} not found.Make sure to pass enironment variable`);
            process.exit();
        }
        const obj = Object.freeze(value);
        return obj;
    }
};
