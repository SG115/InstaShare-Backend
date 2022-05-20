
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL);
    console.log('Noice, MongoDB Connected.')
  }
  catch(err) {
    console.log(err.message);
    console.log("Fuck, can't connect");
    process.exit(1);
  }
}

module.exports = connectDB;