/* eslint-disable no-console */
// Setup empty JS object to act as endpoint for all routes
let projectData = {
  weatherentry: [],
};

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
  res.send(projectData.weatherentry);
});

app.post('/add', (request, response) => {
  const newData = request.body;
  console.log(newData);
  projectData.weatherentry.push(newData);
  console.log(projectData);
  response.send({
    status: 'successful',
  });
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
