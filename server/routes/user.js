// Third party imports
const express = require('express')

// App imports
const userController = require('../controllers/user')

// Router initialization
const router = express.Router() 

// User routes
router.get('/list', userController.users)
router.get('/:userId', userController.user)
router.put('/update/:userId', userController.updateRole)
router.put('/update/avatar/:userId', userController.updateImageUrl)

module.exports = router