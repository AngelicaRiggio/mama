const appKey = "1ce672a334b3801df3cc8289fc285dd9";

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
//let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
// let humidity = document.getElementById("humidity-div");

/* my */
let clothe1 = document.getElementById("clothe1");
let tempmin = document.getElementById("tempmin");
let tempmax = document.getElementById("tempmax");

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
        var element = document.querySelector("header");
        element.classList.remove("introSearch");
        var el = document.querySelector(".search");
        el.classList.add("dnone");
        var el1 = document.querySelector(".clothes");
        el1.classList.remove("dnone");
        el1.classList.add("darkbg")
        var el2 = document.querySelector("#clothe1");
        el2.classList.remove("dnone");
        let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
        httpRequestAsync(searchLink, theResponse);
    }
}

function theResponse(response) {
    let jsonObject = JSON.parse(response);
    cityName.innerHTML = "<p>" + jsonObject.name + "</p>";

    // this is the original render of OWM icons
    //icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    //my code to use Owfont set
    var elicon = document.querySelector("#myicon");
    newfont = "owf-" + jsonObject.weather[0].id;
    //add some animation
    elicon.classList.add('owf', newfont, 'animated', 'heartBeat');

    temperature.innerHTML = "<h1> " + parseInt(jsonObject.main.temp - 273) + "°</h1>";
    tempmin.innerHTML = "<p><i class='ion-md-arrow-dropdown'></i>" + parseInt(jsonObject.main.temp_min - 273) + "°</p>";
    tempmax.innerHTML = "<p>" + parseInt(jsonObject.main.temp_max - 273) + "°<i class='ion-md-arrow-dropup'></i></p>";
    /* action if temperature is beyond or below some level - this setting is 18 */
    if (parseInt(jsonObject.main.temp - 273) < 18) {
        clothe1.innerHTML = "<img src='img/scarfw.svg'>";
        console.log("freddo");
        //var element = document.querySelector(".container");
        //element.classList.add("dnone");
    } else {
        clothe1.innerHTML = "<img src='img/tshirtw.svg'>";
        console.log("caldo");
        //var element = document.querySelector(".container");
        //element.classList.add("dnone");
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