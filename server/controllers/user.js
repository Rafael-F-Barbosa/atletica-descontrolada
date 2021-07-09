const User = require('../models/user')

exports.user = async (req, res, next) => {
    const userId = req.params.userId
    try {
        const user = await User.findById(userId)
        if (!user) {
            const error = new Error('Could not find user.')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({ message: "User fetched.", user: user })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.users = (req, res, next) => {
    User.find()
        .then(users => {
            res.status(200).json({
                message: 'Users fetched.',
                users: users
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}
exports.updateRole = async (req, res, next) => {
    const userId = req.params.userId
    const selectedRole = req.body.selectedRole
    try{
        const user = await User.findOneAndUpdate({ _id: userId }, { role: selectedRole }, {useFindAndModify: false})
        const users = await User.find()
        res.status(200).json({ message: "User updated!", users: users})
    }
    catch(error){
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.updateImageUrl = async (req, res, next) => {
    const userId = req.params.userId
    const imageUrl = req.body.imageUrl
    try{
        const user = await User.findOneAndUpdate({ _id: userId }, { imageUrl: imageUrl }, {useFindAndModify: false})
        const users = await User.find()
        res.status(200).json({ message: "User updated!", users: users})
    }
    catch(error){
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}