const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name."]
        },
        email: {
            type: String,
            required: [true, "Please enter your email."]
        }

    },
    {
        timestamps: true
    }
);

const user = mongoose.model('User', userSchema);

module.exports = user;