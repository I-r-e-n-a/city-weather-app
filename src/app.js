function displayDate(timestamp) {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let currentDate = date.getDate();
  if (currentDate === 1 || currentDate === 21 || currentDate === 31) {
    currentDate = `${currentDate}st`;
  }
  if (currentDate === 2 || currentDate === 22) {
    currentDate = `${currentDate}nd`;
  }
  if (currentDate === 3 || currentDate === 23) {
    currentDate = `${currentDate}rd`;
  }

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  return `${day}, ${currentDate} of ${month}`;
}

function displayTime(timestamp) {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayTemp(response) {
  document.querySelector("#current-city").innerHTML = city;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("#current-conditions").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#current-humidity"
  ).innerHTML = `${response.data.main.humidity}%`;

  document.querySelector("#current-wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = displayDate(response.data.coord.dt * 1000);
  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = displayTime(response.data.coord.dt * 1000);
}

function search(city) {}

function cityInput(event) {
  event.preventDefault();
  let cityInputValue = document.querySelector("#city-input").value;
  search(cityInputValue.value);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", cityInput);
let searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", cityInput);

let city = "Madrid";
let apiKey = "1226c04775770540034fbff39a889d84";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
