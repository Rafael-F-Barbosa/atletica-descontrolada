// Third party imports
const express = require('express')
const { body } = require('express-validator')

// App imports
const authController = require('../controllers/auth')

// Router initialization
const router = express.Router()

// Auth routes
router.post('/sign-up', [
    body('password').trim().isLength({ min: 6 }),
    body('email').isEmail(),
    body('name').trim().not().isEmpty()
], authController.signup)


router.post('/login', authController.login)


module.exports = router