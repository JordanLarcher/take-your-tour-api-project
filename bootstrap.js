const mongoose = require('mongoose');
const app = require('./app');

async function bootstrap(){
    const DB = process.env.MONGO_URI.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
    );


    await mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
        console.log(`App running on port ${port}...`);
    });

    process.on('unhandledRejection', err => {
        console.log('UNHANDLED REJECTION! 💥 Shutting down...');
        console.log(err.name, err.message);
        server.close(() => {
            process.exit(1);
        });
    });
}

module.exports = bootstrap;