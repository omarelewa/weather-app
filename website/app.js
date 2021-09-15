/* eslint-disable no-undef */
// const zip = '94040';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=e5935c759f600ef1895b289b2deb85f3';
// Create a new date instance dynamically with JS
const d = new Date();
const newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;

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
const printLatestEntry = async (url = '/all') => {
  const res = await fetch(url);
  const data = await res.json();
  document.getElementById('date').innerHTML = `Date: ${data[data.length - 1].date}`;
  document.getElementById('temp').innerHTML = `Temperature: ${data[data.length - 1].temperature}`;
  document.getElementById('content').innerHTML = `Feelings: ${data[data.length - 1].user_feelings}`;
};


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
