const Api_KEY = "b3025b2adc51535575fb5f1a9b6bee97";

function onGeoGood(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${Api_KEY}&units=metric`;
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}

function onGeoBad() {
    alert("Can't find you. No weather for you");
}

navigator.geolocation.getCurrentPosition(onGeoGood, onGeoBad);