const express = require('express');
const userController  = require('./../controllers/userController');
const { authenticateJWT } = require('../middleware/authenticateJWT');
const { userValidator } = require('../validators/userValidator');
const { validationResult } = require('express-validator');
const router = express.Router();


router
    .route('/')
    .get(authenticateJWT, userController.getAllUsers)
    .post(userValidator, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, userController.createUser);


router
    .route('/:id')
    .get(authenticateJWT, userController.getUserById)
    .put(authenticateJWT, userValidator, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, userController.updateUser)
    .patch(authenticateJWT, userValidator, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, userController.updateUser)
    .delete(authenticateJWT, userController.deleteUser);

module.exports = router;