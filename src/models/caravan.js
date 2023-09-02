const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const caravanSchema = Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        imagesPath: [{
            type: String
        }],
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
        },
        location: {
            longitude: {
                type: String
            },
            latitude: {
                type: String
            }
        },
        caravanType: {
            drivable: {
                type: Boolean,
                required: false
            },
            isTrailer: {
                type: Boolean,
                required: false
            }
        }, 
        amenities: {
            kitchen: [{
                type: String
            }],
            bath: [{
                type: String
            }],
            entertainment: [{
                type: String
            }],
            temperatureControl: [{
                type: String
            }],
            safety: [{
                type: String
            }],
            laundry: [{
                type: String
            }]
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('Caravan', caravanSchema);

