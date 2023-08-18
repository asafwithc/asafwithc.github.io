const User = require('../models/user')

exports.getUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users);
}

exports.addUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message })
    }
}

