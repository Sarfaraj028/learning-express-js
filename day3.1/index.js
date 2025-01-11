const express = require('express');
const morgan = require('morgan');

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
app.get('/', (req, res) => {
    res.render('index');  // Make sure you have the 'index.ejs' file in your 'views' folder
});

app.post('/submitted-data', (req, res) => {
    console.log('Request Body:', req.body);

    res.send('Data Received!'); // Respond back to the client
});

// Start the server
app.listen(8000, () => {
    console.log('Server started on http://localhost:8000');
});
