const appKey = "1ce672a334b3801df3cc8289fc285dd9";

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");
/* my */
let clothe1 = document.getElementById("clothe1");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
    if (event.key === "Enter") {
        findWeatherDetails();
    }
}

function findWeatherDetails() {
    if (searchInput.value === "") {

    } else {
        let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
        httpRequestAsync(searchLink, theResponse);
    }
}

function theResponse(response) {
    let jsonObject = JSON.parse(response);
    cityName.innerHTML = "<p>This is the weather in </p>" + jsonObject.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = "<p>with a temperature of <p>" + parseInt(jsonObject.main.temp - 273) + "°";
    humidity.innerHTML = "<p>and a humidity of </p>" + jsonObject.main.humidity + "%";
    /* action if temperature is beyond or below some level - this setting is 18 */
    if (parseInt(jsonObject.main.temp - 273) < 18) {
        clothe1.innerHTML = "Metti la giacca!";
        console.log("freddo");
        var element = document.querySelector(".container");
        //element.classList.add("dnone");
    } else {
        clothe1.innerHTML = "Maniche corte!";
        console.log("caldo");
        var element = document.querySelector(".container");
        //element.classList.add("dnone");
        console.log("caldo");
    }
}

function httpRequestAsync(url, callback) {
    console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}