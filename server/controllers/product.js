const Product = require('../models/product')

exports.products = (req,res,next) => {
    Product.find()
    .then(products=>{
        res.status(200).json({
            message: 'Products fetched.',
            products: products
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.addProducts = async (req, res, next) =>{
    const name = req.body.name
    const price = req.body.price
    const imageUrl = req.body.imageUrl
    const product = new Product({
        name: name,
        imageUrl: imageUrl,
        price: price
    })
    try{
        const createdProduct = await product.save()
        await res.status(201).json({message: "Created product!", product: createdProduct})
    }catch(error){
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.deleteProduct = async (req, res, next) =>{
    const productId = req.params.productId
    try{
        const product = await Product.findById(productId)
        if(!product){
            const error = new Error('Could not find product.')
            error.statusCode = 404
            throw error
        }
        await Product.findByIdAndRemove(productId)
        const products = await Product.find()
        res.status(200).json({message: "Post deleted!", products: products})

    }catch(error){
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }

}