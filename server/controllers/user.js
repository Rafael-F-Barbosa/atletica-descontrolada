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

    }catch(error){
        if(!error.statusCode){
            error.statusCode = 500
        }
        next(error)
    }
}
