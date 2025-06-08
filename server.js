const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({oath: ".env"});
const connectDB = require("./config/database");
const winston = require("./util/logger");

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