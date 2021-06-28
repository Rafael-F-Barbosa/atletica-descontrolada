// Third party imports
const express = require('express')

// App imports
const productController = require('../controllers/product')

// Router initialization
const router = express.Router() 

// User routes
router.get('/', productController.products)


// User routes
router.post('/add', productController.addProducts)


module.exports = router