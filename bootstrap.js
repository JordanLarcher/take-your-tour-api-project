const app = require('./app');
const connectDB = require("./config/db");
const logger = require("./utils/logger");

async function bootstrap(){
    try {

        await connectDB();
        const port = process.env.PORT || 3000;
        const server = app.listen(port, () => {
            logger.info(`App running on port ${port}...`);
        });



        process.on('unhandledRejection', err => {
            logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
            logger.error(err.name, err.message);
            server.close(() => {
                process.exit(1);
            });
        });
    } catch (error) {
        logger.error(`<UNK> Failed to connect to Mongo database: ${error.message}`);
        process.exit(1);
    }
}

module.exports = bootstrap;