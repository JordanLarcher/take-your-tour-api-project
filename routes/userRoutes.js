const express = require('express');
const userController  = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const { validationResult } = require('express-validator');
const router = express.Router();


router.post('/signup', authController.signup);


router
    .route('/')
    .get(userController.getAllUsers)
    .post( (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, userController.createUser);


router
    .route('/:id')
    .get(userController.getUserById)
    .put((req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, userController.updateUser)
    .patch( (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;