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
    return `${day} ${hours} ${minutes}`;
}

function displayTemperature(response) {
    document.querySelector("#temperature-degree").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#current-condition").innerHTML = response.data.weather[0].description;
    document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
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
    let fahrenheitConversion = (14 * 9) / 5 + 32;
    document.querySelector("#temperature-degree").innerHTML = Math.round(fahrenheitConversion);
}

function convertCelsius(event) {
    event.preventDefault();
    let celsiusConversion = (14 * 9) / 5 + 32;
    document.querySelector("#temperature-degree").innerHTML = Math.round(celsiusConversion);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

document.querySelector("#fahrenheit").addEventListener("click", convertFahrenheit);
document.querySelector("#celsius").addEventListener("click", convertCelsius);

search("New York");