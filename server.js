// Setup empty JS object to act as endpoint for all routes
projectData = {};

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

// DEBUGGING STATIC MIDDLEWARE
// npm install path?!
// const path = require('path');
// app.use(express.static(path.join(__dirname, './static')));

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

// DEBUGGING EXPRESS SERVER INITIALIZATION
// app.get('/', (request, response)=>{
//     response.send('Hello, this is Omar Elewa');
// });

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
