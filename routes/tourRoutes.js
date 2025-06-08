const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');
const { tourValidator } = require('../validators/tourValidator');
const tourController = require('./../controllers/tourController');
const { authenticateJWT } = require('../middleware/authenticateJWT');

router.param('id', tourController.checkTourId);


router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTourById)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;