//Variables for section. Indentify selected location, current temp
var dropL = document.querySelector("#searchField")

//Change event for city drop down, add event listener to run myFunction
dropL.addEventListener("change", dropdownHandler)

//Variable to fetch weather info
function dropdownHandler(event) {
    document.querySelector("#clearDiv").innerHTML = "";
    console.log(event.target.value);
    var cityName = event.target.value;
    var queryUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=662a8e54640cc40085727afa832a2eb6&units=imperial")
    fetch(queryUrl)
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        var temp = response.main.temp;
        var weather = response.weather[0].main;

        var currentWeather = document.createElement('p');
        currentWeather.innerText = weather;
        const weatherLocation = document.querySelector(".weatherDiv")
        weatherLocation.appendChild(currentWeather)

        var currentTemp = document.createElement('p');
        currentTemp.innerText = temp;
        const tempLocation = document.querySelector(".tempDiv")
        tempLocation.appendChild(currentTemp)
    })
    }

