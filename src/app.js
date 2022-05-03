function displayTemp(response) {
  console.log(response.data);
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
}

let apiKey = "1226c04775770540034fbff39a889d84";
let city = "Madrid";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
