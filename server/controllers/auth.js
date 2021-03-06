const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const User = require('../models/user')


exports.signup = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const errors = validationResult(req)
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation Fail.')
            error.statusCode = 422
            error.data = errors.array()
            throw error
        }
        const hasEmailBeenUsed = await User.findOne({ email: email })
        if (hasEmailBeenUsed !== null) {
            const error = new Error("Email already used!")
            error.statusCode = 403
            throw error
        }
        const hashedPw = await bcrypt.hash(password, 12)
        const user = new User({
            email: email,
            password: hashedPw,
            name: name
        })
        const createdUser = await user.save()
        res.status(201).json({ message: "User created successfully!", user: createdUser })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    let loadedUser = undefined
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            const error = new Error('Email could not be found.')
            error.statusCode = 401
            throw error
        }
        loadedUser = user
        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            const error = new Error('Wrong password!')
            error.statusCode = 401
            throw error
        }
        const token = await jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        },
            'somesupersecretesecret', { expiresIn: '2h' }
        )
        res.status(200).json({
            token: token,
            userId: loadedUser._id.toString()
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        if (!error.message) {
            error.message = "Failed to login!"
        }
        next(error)
    }
}
