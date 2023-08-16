const mongoose = require('mongoose');
require('dotenv').config();

// Replace the uri string with your connection string.
const uri = process.env.MONGO_URI;

async function main() {
  await mongoose.connect(uri);
}

main().catch(err => console.log(err));


