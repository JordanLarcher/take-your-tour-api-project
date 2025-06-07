const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const compression = require('compression');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');



const app = express();


app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
    }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(xssClean());
app.use(hpp());
app.use(cookieParser());

// Simple route for testing
app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});





app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});