/* eslint-disable no-console */
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

app.get('/all', (req, res) => {
  res.send(projectData);
});

app.post('/add', (req, res) => {
  // should post date, temp and content
  projectData.date = req.body.date;
  projectData.temp = req.body.temperature;
  projectData.content = req.body.user_feelings;
  res.send({ msg: 'data posted successfully' });
  // because res.send("data posted..") led to an error (Error! SyntaxError: Unexpected token d in JSON at position 0)
  console.log('server ', projectData);
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
