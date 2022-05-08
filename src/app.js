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
  } else {
    currentDate = `${currentDate}th`;
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

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3">
          <div class="card next-weather">
             <div class="card-body">
               <div class="next-day">${formatForecastDate(forecastDay.dt)}</div>
                  <img
                   src="https://openweathermap.org/img/wn/${
                     forecastDay.weather[0].icon
                   }@2x.png"
                   alt="weather-icon"
                   width="45"
                   />
                  <div>
                    <span class="next-max-temp">${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                     <span class="next-min-temp"> ${Math.round(
                       forecastDay.temp.min
                     )}°</span>
                  </div>
                      <div class="next-conditions">${
                        forecastDay.weather[0].main
                      }</div>
                </div>
            </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1226c04775770540034fbff39a889d84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemp(response) {
  let currentCity = document.querySelector("#current-city");
  let currentTemp = document.querySelector("#current-temp");
  let currentConditions = document.querySelector("#current-conditions");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWind = document.querySelector("#current-wind");
  let iconElement = document.querySelector("#icon");
  let currentDate = document.querySelector("#date");
  let currentTime = document.querySelector("#time");

  celsiusTemperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${celsiusTemperature}°`;
  currentCity.innerHTML = response.data.name;
  currentConditions.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = `${response.data.main.humidity}%`;
  currentWind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  currentDate.innerHTML = displayDate(response.data.coord.dt * 1000);
  currentTime.innerHTML = displayTime(response.data.coord.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "1226c04775770540034fbff39a889d84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function handlleForm(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handlleForm);
let searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", handlleForm);

search("Madrid");
