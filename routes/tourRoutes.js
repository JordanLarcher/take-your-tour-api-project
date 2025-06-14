const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');
const { tourValidator } = require('../middlewares/validators/tourValidator');
const tourController = require('./../controllers/tourController');
const { authenticateJWT } = require('../middlewares/authenticateJWT');

//router.param('id', tourController.checkTourId);

router.route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours);
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTourByID)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;