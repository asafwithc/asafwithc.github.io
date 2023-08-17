const mongoose = require('mongoose');
require('dotenv').config();

// Replace the uri string with your connection string.
const uri = process.env.MONGO_URI;

mongoose.connect(uri)
        .catch((err) => console.log(err));



