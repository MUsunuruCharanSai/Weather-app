const apiKey = 'rxgBGmksde2KpAhjtoWK3Qp1TK1kCRen';
const apiUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search/';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

async function fetchWeather(location) {
    const url=`${apiUrl}?apikey=${apiKey}&q=${location}`
    const data = await fetch(url)
    const response = await data.json()
    const key = +response[0].Key;
    const data2 = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apiKey}`)
    const res = await data2.json()
    locationElement.textContent = res[0].WeatherText;
    temperatureElement.textContent = `${Math.round(res[0].Temperature.Metric.Value)}°C`;
    descriptionElement.textContent = `Day Time : ${res[0].IsDayTime ? "yes" : "no"}`
}