const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://localhost:27017/login-signUp')
.then(() =>{
    console.log("Data base Connected");
    
})
.catch(() =>{
    console.log("failed to connect");
    
})

module.exports = connection