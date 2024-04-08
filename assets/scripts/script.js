"use strict";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "92f21b188a400af8bfed32ea5e09220f";

const searchFormCont = document.getElementById("search-form");
const searchInput = document.querySelector(".search-input");
const mainWeatherCont = document.querySelector(".main-weather");

const getCurrentDate = function () {
  const today = new Date();
  const options = { weekday: "long", day: "2-digit", month: "short" };

  return new Intl.DateTimeFormat("en-US", options).format(today);
};

const displayCurrentWeather = function (data) {
  const [weather] = data.weather;
  const html = `<h2 class="title-2">Now</h2>
    <div class="heading flex main-info">
      <p>${data.main.temp}°<sup>c</sup></p>
      <img
        class="weather-icon"
        src="./assets/images/weather_icons/${weather.icon}.png"
        alt="${weather.main}"
        width="64"
        height="64"
      />
    </div>
    <p>${weather.main}</p>
    <ul class="secondary-info">
      <li class="flex secondary-info-item">
        <span class="m-icon">calendar_today</span>
        <p class="item-text">${getCurrentDate()}</p>
      </li>
      <li class="flex secondary-info-item">
        <span class="m-icon">location_on</span>
        <p class="item-text">${data.name}, ${data.sys.country}</p>
      </li>
    </ul>`;

  mainWeatherCont.innerHTML = "";
  mainWeatherCont.insertAdjacentHTML("afterbegin", html);
};

const searchCityWeather = function (city) {
  fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      displayCurrentWeather(data);
    });
};

searchFormCont.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = searchInput.value;
  searchCityWeather(cityName);
});
