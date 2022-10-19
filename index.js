function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weekDays = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[weekDays];

  return `${day} ${hours}:${minutes}`;
}
let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#input-city");
  cityElement.innerHTML = cityInput.value;
}

function displayWeather(response) {
  let currentWeather = document.querySelector("#temperature");
  currentWeather.innerHTML = Math.round(response.data.main.temp);
  let weatherInfo = document.querySelector("#description");
  weatherInfo.innerHTML = response.data.weather[0].main;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
}

function searchCity(city) {
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function revealCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", revealCity);
