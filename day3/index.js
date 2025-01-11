const express = require('express');
const morgan = require('morgan')
const app = express();

app.set("view engine", "ejs")

// Custom Middleware for all routers
// app.use((req, res, next) =>{
//     console.log("Custom Middleware");
    
//     a = 10;
//     b = 20;

//     console.log(a+b);
//     return next(); //for giving controll to nexts prarameters
// })// Now this middleware are being used only for / route

app.get("/", (req, res, next) =>{
    console.log("Custom Middleware");
    
    a = 10;
    b = 20;

    console.log(a+b);
    return next(); //for giving controll to nexts prarameters
  },(req, res) =>{
    res.render('index')
   }
)

// morgan middleware also called logger middleware
app.use(morgan('dev'))

app.get('/about', (req, res) =>{
    res.send("about page")
})

app.listen(8000, () =>{
    console.log("server started");
})