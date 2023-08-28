const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const caravanSchema = Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        caravanType: {
            drivable: {
                type: Boolean,
                required: true
            },
            isTrailer: {
                type: Boolean,
                required: true
            }
        }, 
        title: {
            type: String
        },
        description: {
            type: String
        },
        accomodation: {
            beds: {
                type: Number
            },
            guests: {
                type: Number
            } 
        },
        caravan: {
            brand: {
                type: String
            }, 
            model: {
                type: String
            }
        }, 
        price: {
            perNight: {
                type: Number
            },
            minimumDays: {
                type: Number
            }
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('Caravan', caravanSchema);

