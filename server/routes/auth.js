// Third party imports
const express = require('express')

// App imports
const authController = require('../controllers/auth')

// Router initialization
const router = express.Router() 

// Auth routes
router.post('/sign-up', authController.signup)


router.post('/login', authController.login)


module.exports = router