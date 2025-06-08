const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
// Import route modules
const tourRoutes = require('./tourRoutes');
const userRoutes = require('./userRoutes');


// Mount the tour routes
router.use('/tours', authenticateJWT, tourRoutes);
// Mount the user routes
router.use('/users', authenticateJWT, userRoutes);

module.exports = router;