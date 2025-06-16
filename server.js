const dotenv = require('dotenv');
// Load env variables
dotenv.config({ path: './.env' });
const bootstrap = require('./bootstrap');


process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});


bootstrap().catch(err => {
  console.log('❌ Failed to bootstrap application:', err.message);
  process.exit(1);
})



