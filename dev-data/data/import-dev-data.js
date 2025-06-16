const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const connectDB = require('../../config/db');
const logger = require("../../utils/logger");

// Loading env variables
dotenv.config({ path: `${__dirname}/../../env` });

// Connecting to DB
const run = async () => {
  try {
    await connectDB();
    const tours = JSON.parse(
        fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
    );

    //Import or delete depending on the argument
    if (process.argv[2] === '--import') {
      await Tour.create(tours);
      logger.info('Data successfully imported.');
    } else if (process.argv[2] === '--delete') {
      await Tour.deleteMany(tours);
      logger.info('Data successfully deleted!');
    }

  } catch (error ) {
    logger.error('Error: ', error);
    process.exit(1);
  }
};

run();
