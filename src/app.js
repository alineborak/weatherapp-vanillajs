function formatDate(timeStamp) {
    let date = new Date(timeStamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekdays[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
    let forecastEl = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
    days.forEach(function (day) {
        forecastHTML = forecastHTML + `
        <div class="col-2">
        ${day} 
        <img 
        src="media/cloudy.png" 
        alt=""
        width="38px"
        />
        <div class="weather-forecast-temperatures">
        <span class="weather-temp-max">
        Max: 18°
        </span>
        <span class="weather-temp-min">
        Min: 12°
        </span>
        </div>
        </div>
        `;
    });
    forecastHTML = forecastHTML + `</div>`
    forecastEl.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "384781b633046620eaed677419a0ac6e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
};

function displayTemperature(response) {
    celsiusTemperature = response.data.main.temp;
    document.querySelector("#temperature-degree").innerHTML = Math.round(celsiusTemperature);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#current-condition").innerHTML = response.data.weather[0].description;
    document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);

    displayForecast();
    getForecast(response.data.coord);
}

function search(city) {
    let apiKey = "384781b633046620eaed677419a0ac6e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

function convertFahrenheit(event) {
    event.preventDefault();
    fahrenheitTemperature = document.querySelector("#temperature-degree");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitConversion = (celsiusTemperature * 9) / 5 + 32;
    fahrenheitTemperature.innerHTML = Math.round(fahrenheitConversion);
}

function convertCelsius(event) {
    event.preventDefault();
    let celsiusConversion = celsiusTemperature;
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    document.querySelector("#temperature-degree").innerHTML = Math.round(celsiusConversion);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertCelsius);

search("Rotterdam");