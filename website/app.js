/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* Global Variables */
//const zip = '360630';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?id=';
const apiKey = '&appid=e5935c759f600ef1895b289b2deb85f3';
// Create a new date instance dynamically with JS
const d = new Date();
const newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;
// eslint-disable-next-line no-undef
// const date = document.getElementById('date');
// date.innerHTML = newDate;

document.getElementById('generate').addEventListener('click', performAction);

async function performAction() {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  const weatherdata = await getWeatherData(baseURL, zip, apiKey);
  console.log(weatherdata);
  const weatherEntry = {
    date: newDate,
    temperature: weatherdata.main.temp,
    user_response: feelings,
  };
  const post_result = await postWeatherEntry('/add', weatherEntry);
  console.log(post_result);
  await printLatestEntry('/all');
}

const getWeatherData = async (baseURL, zip, apiKey) => {
  const url = baseURL + zip + apiKey;
  const res = await fetch(url);
  const weatherData = await res.json();
  return weatherData;
};

const postWeatherEntry = async (url = '/add', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

const printLatestEntry = async (url = '/all') => {
  const response = await fetch(url);
  const data = await response.json();
  const date = (document.getElementById('date').innerHTML = `Date: ${data[data.length - 1].date}`);
  const temp = (document.getElementById('temp').innerHTML = `Temperature: ${
    data[data.length - 1].temperature
  }`);
  const content = (document.getElementById('content').innerHTML = `Feelings: ${
    data[data.length - 1].user_response
  }`);
};
