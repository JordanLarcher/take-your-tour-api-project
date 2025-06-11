const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swagger");
const passport = require("./config/passport"); // Passport configuration
const connectDB = require("./config/database");
const winston = require("./utils/logger");


const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");
const oauthRoutes = require("./routes/oauthRoutes");


const app = express();


//  1) Middlewares
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Log requests in development mode

}

app.use(express.json()); // Parse JSON bodies
app.use(express.static(`${__dirname}/public`)); // Serve static files from the public directory
app.use(cors());
app.use(helmet());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
    }));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({ // Added session middleware
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Swagger docs served at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




// 3)ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/oauth', oauthRoutes);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.use(errorHandler);



// Connect to MongoDB
(async function startServer() {
    try {
        await connectDB();
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () =>
          winston.info(`Server running at http://localhost:${PORT}`)
        );
    } catch (error) {
        winston.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
})();