const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Book your Tour API',
            version: '1.0.0',
            description: 'This is the API documentation for the Book your Tour application, which allows users to book tours and manage their bookings.'
        },
        servers: [
            {
                url: 'https://take-your-tour-api-project.onrender.com',
            },
        ],
    },
    apis: [path.join(__dirname, '../routes/*.js')],
};

module.exports = swaggerJsdoc(swaggerOptions);