const express = require('express');
const {body, validationResult} = require('express-validator');

const Admin = require('../models/adminModel');
const authController = require('../controllers/adminControllers.js')


const router = express.Router();

/** POST Method For Registration/ SignUP  -->  /auth/signup */
router.post('/signup',[
    body('email')
    .isEmail()
    .withMessage('Please Enter A Valid Email')
    .custom((value, {req}) => {
        return Admin.findOne({ email: value}).then(adminsDoc => {
            if(adminsDoc) {
                return Promise.reject('This Admin email already exist !')
            }
        })
    })
    .normalizeEmail(),
    body('password').trim().isLength({min: 7}),
    body('name').trim().not().isEmpty()
], authController.signUp);

/** POST Method For LOGIN  -->  /auth/login */
router.post('/login', authController.login)

module.exports = router;