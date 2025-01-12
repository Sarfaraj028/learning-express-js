const express = require('express');
const morgan = require('morgan');
const userModel = require('./models/users')
const connection = require('./config/db')
const bcrypt = require('bcrypt')

const app = express();

app.set('view engine', 'ejs');

// Logger middleware (third-party)
app.use(morgan('dev'));
// Built-in middleware to parse JSON data (application/json)
app.use(express.json());
// Built-in middleware to parse URL-encoded data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
//  midleware for static file, assets, js file
app.use(express.static('public'))

// Serve the index page
app.get('/register', (req, res) => {
    res.render('index');  // Make sure you have the 'index.ejs' file in your 'views' folder
});

app.get('/', (req, res) => {
    res.send("Home page")
});

app.post('/submitted-data', async (req, res) => {
    console.log('Request Body:', req.body);

    const {username, email, password} = req.body;
    const hashedPass = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username: username,
        email: email,
        password: hashedPass
    })
    res.send(user); // Respond back to the client
});

//get users /find user
app.get('/get-users', async (req, res) => {
    try {
        const users = await userModel.findOne({
            email: "kalu@gmai.comskbvksbh"
        }); // Retrieve all users 
        res.json(users); // Respond with the list of users
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Failed to retrieve users' });
    }
});

// find and update user 
app.get("/update-users", async (req, res) =>{
        await userModel.findOneAndUpdate({
            username: 'salman'
        },{
            email: 'sallu2@gmail.com'
        })
        res.send("updated")
        
})

app.get("/delete-users", async (req, res) =>{
    await userModel.findOneAndDelete ({ // method is used to find and delerte the data
        username: 'saif`'
    })
    res.send("data deleted")
    
})

// Start the server
app.listen(8000, () => {
    console.log('Server started on http://localhost:8000');
});
