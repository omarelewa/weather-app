/* Global Variables */
const zip = '360630';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?id=';
const apiKey = '&appid=e5935c759f600ef1895b289b2deb85f3';
// Create a new date instance dynamically with JS
const d = new Date();
const newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;
// eslint-disable-next-line no-undef
const date = document.getElementById('date');
date.innerHTML = newDate;

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  let zipcode = document.getElementById('zip').value;
  getWeatherZip(baseURL, zipcode, apiKey);
}

const getWeatherZip = async (baseURL, zipcode, api_key) => {
  //   console.log(baseURL + zipcode + api_key);
  const res = await fetch(baseURL + zipcode + api_key);
  try {
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log('error', error);
  }
};
