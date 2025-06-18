const dotenv = require('dotenv');
// Load env variables
dotenv.config({ path: './.env' });
const bootstrap = require('./bootstrap');
const logger = require('./utils/logger');


process.on('uncaughtException', err => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  logger.error(err.stack);
  process.exit(1);
});


(async () => {
  try{
    await bootstrap();
  } catch (err) {
    logger.error('Error occurred', err);
    process.exit(1);
  }
})();