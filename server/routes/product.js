// Third party imports
const express = require('express')


// App imports
const productController = require('../controllers/product')
const isAuth = require('../middleware/isAuth')

// Router initialization
const router = express.Router()

// Products routes
router.get('/', productController.products)

router.post('/add', isAuth, productController.addProducts)

router.delete('/delete/:productId',isAuth, productController.deleteProduct)

module.exports = router