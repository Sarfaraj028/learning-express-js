const express = require('express')
const mongoose = require('mongoose')
const userModel = require('./models/users')
const connect = require('./config/db')

const app = express();

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>{
    res.render("login")
})

//post of user login
app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body
        const checkedUser = await userModel.findOne({ username });
        
        if (!checkedUser) {
            return res.send("User not found");
        }

        if (checkedUser.password === password) {
            res.render("home");
        } else {
            res.send("Invalid password");
        }
    } catch (error) {
        res.status(500).send("Server error: " + error.message);
    }
});


app.get('/sign-up', (req, res) =>{ 
    res.render("sign-up")
})

//post when user register
app.post('/sign-up', async (req, res) =>{ 
    try {
        const data = req.body
        await userModel.create(data) //insertMany()
        console.log("user created: ",data);
        
        res.render("home")
    } catch (error) {
        console.error("Error while creating new user", error);
        res.status(500).json(
            {
                message: "user not created!"
            }
        )
    }
})

app.listen(8000, () =>{
    console.log("server running at http://localhost:8000");
    
})