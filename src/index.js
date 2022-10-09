let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let weekDay = `${day}`;
let time = `${hours}:${minutes}`;
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${weekDay}`;
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${time}`;

function displayWeatherCondition(response) {
  document.querySelector("#current-city-display").innerHTML =
    response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}
function searchCity(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  searchCity(city);
  console.log(city);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("click", submitSearch);

function getPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
function showTemp(response) {
  let displayTempDetails = document.querySelector("#current-temperature");
  displayTempDetails.innerHTML = `${showTemp.value}`;
  document.querySelector("#current-city-display").innerHTML =
    response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let temperature = Math.round(response.data.main.temp);
  let mainMaxTemp = (document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  ));
  showTemp.innerHTML = `${temperature}`;
  let mainMinTemp = (document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  ));
  console.log(mainMinTemp, mainMaxTemp);
  displayWeatherCondition(showTemp);
}
searchCity("Charlotte, NC");

function showWeatherDescription(response) {
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${showWeatherDescription.value}`;
  document.querySelector("#description").innerHTML =
    response.value.weather.description;
  displayWeatherCondition(showWeatherDescription);
}
let iconElement = document.querySelector(".large-weather-icon");
iconElement.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
iconElement.setAttribute("alt", response.data.weather[0].description);
