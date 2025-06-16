const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info('✅ Connected to Mongo database');
    } catch (err) {
        logger.error(`❌ Failed to connect to database: ${err.message}`);
        throw err;
    }
};

module.exports = connectDB;