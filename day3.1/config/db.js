const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://0.0.0.0/day3').then(() =>{
    console.log("Data base Connected");
    
})

module.exports = connection