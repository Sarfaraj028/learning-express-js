const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://localhost:27017/day3').then(() =>{
    console.log("Data base Connected");
    
})

module.exports = connection