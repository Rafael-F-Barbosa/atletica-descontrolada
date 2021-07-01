// Third-party imports
const express = require('express')
const mongoose = require('mongoose')

// App imports
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const product = require('./models/product')

// Create express apps
const app = express()

// Using parser
app.use(express.json())


// CORS configuration
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

// Registering routes
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/products', productRoutes)

// Error handling middleware
app.use((error,req,res,next)=>{
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data:data})
})


// Connection to database
const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.e8ydb.mongodb.net/descontrolada?retryWrites=true&w=majority`
mongoose.connect(mongoUrl,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true 
    }
).then((result) => {
    console.log("Connected to database.")
    // Initializes server
    app.listen(process.env.PORT || 8080)
}).catch((error)=>{
    console.log("Failed to connect to database.")
    console.log(error)
})




