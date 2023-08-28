const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        model: {
            type: String,
            required: [true, "Please enter model."]
        },
        year: {
            type: Number,
            required: [true, "Please enter year."]
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('Caravan', userSchema);

