// Third party imports
const express = require('express')

// App imports
const userController = require('../controllers/user')
const isAuth = require('../middleware/isAuth')

// Router initialization
const router = express.Router() 

// User routes
router.get('/list', userController.users)
router.get('/:userId', isAuth, userController.user)
router.put('/update/:userId', isAuth, userController.updateRole)
router.put('/update/avatar/:userId', isAuth, userController.updateImageUrl)

module.exports = router