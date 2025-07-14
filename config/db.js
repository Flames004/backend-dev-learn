const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost:27017/mydatabase').then(() => {
    console.log("Database connected successfully");
})

module.exports = connection;