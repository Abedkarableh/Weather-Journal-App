// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('website'));

// Setup Server
const port = 5050;
app.listen(port, listening)
function listening() {
     console.log(`Server running on http://localhost:${port}`);
};

// GET route to return projectData
app.get('/all', (req, res) => {
     res.send(projectData);
});

// POST route to add data to projectData
app.post('/add', (req, res) => {
     const { temperature, date, userResponse } = req.body;
     projectData = { temperature, date, userResponse };
     res.send({ message: 'Data added successfully!' });
});
