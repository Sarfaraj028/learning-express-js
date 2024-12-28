const express = require('express');
const users = require('./MOCK_DATA.json');  // Assuming this file exists and contains user data
const fs = require('fs')

const port = 3000;
const app = express();

app.use(express.json());

// Middleware to parse JSON bodies (important for POST requests)
app.use(express.urlencoded({extended: false}));  // This is required for parsing request bodies as JSON

// Home route
app.get('/', (req, res) => {
    res.send("Home page");
});

const html = `
    <ol>
    ${users.map(user => `<li> ${user.first_name} </li>`)}
    </ol>
`
app.get('/users', (req, res) => {
    res.send(html);
})


// POST request to add a new user
app.post('/api/users', (req, res) => { 
    const newUser = req.body;
    users.push({...newUser, id: users.length + 1})
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) =>{
        return res.json({status: "success", id: users.length });  // Return success message with new user
    })
    
});

// pending => 1. delete users from json
//            2. patch and put/edot users data in json

// Start the server
app.listen(port, () => {
    console.log("Listening on port " + port);  // Fixed the missing space
});
