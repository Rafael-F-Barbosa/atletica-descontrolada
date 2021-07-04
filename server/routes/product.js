// Third party imports
const express = require('express')

// App imports
const productController = require('../controllers/product')

// Router initialization
const router = express.Router() 

// Products routes
router.get('/', productController.products)

router.post('/add', productController.addProducts)

router.delete('/delete/:productId', productController.deleteProduct)

module.exports = router