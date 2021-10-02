/* eslint-disable no-undef */
// const zip = '94040';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=e5935c759f600ef1895b289b2deb85f3&units=imperial';
// Create a new date instance dynamically with JS
let day = new Date();
let newDate = (day.getMonth() + 1) + '/'+ day.getDate()+'/'+ day.getFullYear();

// eslint-disable-next-line no-use-before-define
const generate = document.getElementById('generate').addEventListener('click', performAction);

const fetchWeatherData = async (baseURL, zip, apiKey) => {
  // construct API URL for fetch
  const url = baseURL + zip + apiKey;
  const res = await fetch(url);
  // convert the body into json
  const weatherData = await res.json();
  return weatherData;
};

const saveWeatherData = async (url = '/add', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const newWeatherEntry = await res.json();
  return newWeatherEntry;
};

// manipulate HTML file for dynamic UI
const updateUI = async()=>{
  const request = await fetch('/all')
  try{
    const allData = await request.json();
    console.log(allData)
    document.getElementById('date').innerHTML = Date:${allData.date};
    document.getElementById('temp').innerHTML = Temperature:${allData.temp};
    document.getElementById('content').innerHTML = I feel:${allData.content};
  }
  catch(err){
    console.log('error',err);
  }
}

async function performAction() {
  // capture zip value
  const zip = document.getElementById('zip').value;
  // check for zip code absence
  if (!zip) {
    alert('Please enter a ZIP code!');
    return;
  }
  // capture feelings value
  const feelings = document.getElementById('feelings').value;
  // check for feelings absence
  if (!feelings) {
    alert('Please enter a valid journal entry!');
    return;
  }
  // go fetch weather data from external api
  const weatherdata = await fetchWeatherData(baseURL, zip, apiKey);
  // check for weather data absence
  if (!weatherdata) {
    alert('Error while getting temperature from the entered ZIP code');
    return;
  }
  const weatherEntry = {
    date: newDate,
    temperature: weatherdata.main.temp,
    user_feelings: feelings,
  };
  await saveWeatherData('/add', weatherEntry);
  await printLatestEntry('/all');
}
