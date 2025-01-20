const express = require('express')
const mongoose = require('mongoose')
const userModel = require('./models/users')
const connect = require('./config/db')

const app = express();

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>{
    res.render("home")
})
app.get('/login', (req, res) =>{
    res.render("login")
})
app.get('/sign-up', (req, res) =>{
    res.render("sign-up")
})

app.post('/', async (req, res) =>{
    
    const {username, password} = req.body;

    const user = await userModel.create({
        username: username,
        password: password
    })

    // check user already exist or not 
    const exstingUser = await userModel.findOne({
        username: username
    })
    if(exstingUser){
        res.send("already existing")
    }
    else{
        res.render("login")
    }

    console.log(user);
    
    res.render('home')
})
app.post('/', async (req, res) =>{

    const {username, password} = req.body;

    const user = await userModel.findOne({
        username: 'saif'
    })

    if(user.password === password){
        res.render('home')
    }
    else{
        res.send("User not found")
    } 

    console.log(user);
})

app.listen(8000, () =>{
    console.log("server running at http://localhost:8000");
    
})