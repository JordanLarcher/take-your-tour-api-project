require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./docs/swagger");
const cookieSession = require('cookie-session');
const authRoutes = require("./routes/authRoutes");
const oauthRoutes = require("./routes/oauthRoutes");
const errorHandler = require("./middleware/errorHandler");
require("./config/passport"); // Passport configuration
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();


//  1) Middlewares
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Log requests in development mode

}

app.use(express.json()); // Parse JSON bodies
app.use(express.static(`{__dirname}/public`)); // Serve static files from the public directory
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
    }));
app.use(express.urlencoded({extended: true}));
app.use(compression());
app.use(xssClean());
app.use(hpp());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// Swagger docs served at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




// 3)ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/oauth', oauthRoutes);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api', mainRoutes);

app.use(errorHandler);

module.exports = app;