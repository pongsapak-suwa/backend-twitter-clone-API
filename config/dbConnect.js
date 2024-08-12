const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('database connected');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;