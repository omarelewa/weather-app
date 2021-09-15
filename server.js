// Setup empty JS object to act as endpoint for all routes
let projectData = {
  weatherentry: []
};
// const api_key = 'e5935c759f600ef1895b289b2deb85f3';

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
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

// DEBUGGING EXPRESS SERVER INITIALIZATION

// Defining an end-point to return all ads
app.get('/all', function getProjectData(req, res) {
  
  res.send(projectData.weatherentry);
  
  // res.send(projectData);
  // console.log prints in the local terminal
  // console.log('Hello there!');
  // console.log(req.url);
  // console.log(req.ip);
  // console.log(req.hostname);
  // console.log(req.method);
  // console.log(req.protocol);
  // console.log(req.path);
  // console.log(req.query);
  // console.log(req.subdomains);
  // user/72  /product/223
  // app.get("/user/:id")     app.get("/product/:id")
  // req.params.id
  // console.log(req.params);
});

app.post('/add', function addWeatherEntry(request, response) {
  const newData = request.body;
  console.log(newData);
  projectData.weatherentry.push(newData);
  console.log(projectData);
  res.send({
    status: "successful"
  });
});


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${port}`);
});
