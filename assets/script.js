var dropL = document.querySelector(".search");
var storageArray = [];

dropL.addEventListener("change", myfunction);

function myfunction(event) {
  console.log(event.target.value);
  const dropL = event.target.value;
  fetch(
    "https://developer.nps.gov/api/v1/parks?parkCode=" +
      dropL +
      "&stateCode=Tx&limit=50&start=0&api_key=7XBVh3JlfEvfScseNuuSZfPdln6Rdn8jH5v7fFy7",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      let hName = response.data[0].fullName;
      var obj = [hName];

      storageArray.push(obj);
      localStorage.setItem("history", JSON.stringify(storageArray));
      var recentSearch = JSON.parse(localStorage.getItem("history"));
      var displayHistory = document.querySelector("#recent-search");
      // displayHistory.textContent = `${recentSearch}`;

      displayHistory.innerHTML = "";
      var M = 0
      if (recentSearch.length < 6){M = recentSearch.length}
      else {M = 5}
        for (i = 0; i < M; i++) {
        var searchResults = document.createElement("li");
          if (recentSearch[i]===null) {return}
          else {
        searchResults.textContent = recentSearch[i];
        displayHistory.appendChild(searchResults);
      }}

      const cty = response.data[0].addresses[0].city;
      const citName = response.data[0].name;
      const imgUrl = response.data[0].images[0].url;
      const lin1 = response.data[0].addresses[0].line1;
      const postalC = response.data[0].addresses[0].postalCode;
      const stateC = response.data[0].addresses[0].stateCode;

      const city = document.querySelector("#city");
      const cityName = document.querySelector("#cityname");
      const imag = document.querySelector("#img");
      const line1 = document.querySelector("#line1");
      const pc = document.querySelector("#pc");
      const sc = document.querySelector("#sc");

      city.textContent = `${cty}`;
      cityName.textContent = `${citName}`;
      imag.src = `${imgUrl}`;
      line1.textContent = `${lin1}`;
      pc.textContent = `${postalC}`;
      sc.textContent = `${stateC}`;

      fetch(
        "https://api.openweathermap.org/data/2.5/weather?zip=" +
          postalC +
          ",us&appid=662a8e54640cc40085727afa832a2eb6&units=imperial"
      )
        // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

        //zip = response.data[0].addresses[0].postalCode

        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          document.querySelector(".tempDiv").innerHTML = "";
          document.querySelector(".weatherDiv").innerHTML = "";
          document.querySelector(".humidityDiv").innerHTML = "";
          document.querySelector(".windDiv").innerHTML = "";
          console.log(response);
          var temp = response.main.temp;
          var weather = response.weather[0].main;
          var humidity = response.main.humidity;
          var wind = response.wind.speed;

          var currentWeather = document.createElement("p");
          currentWeather.innerText = weather;
          const weatherLocation = document.querySelector(".weatherDiv");
          weatherLocation.appendChild(currentWeather);

          var currentTemp = document.createElement("p");
          currentTemp.innerText = temp;
          const tempLocation = document.querySelector(".tempDiv");
          tempLocation.appendChild(currentTemp);

          var currentHumidity = document.createElement("p");
          currentHumidity.innerText = humidity;
          const humidityLocation = document.querySelector(".humidityDiv");
          humidityLocation.appendChild(currentHumidity);

          var currentWind = document.createElement("p");
          currentWind.innerText = wind;
          const windLocation = document.querySelector(".windDiv");
          windLocation.appendChild(currentWind);

          var iconInput = response.weather[0].icon;
          var weatherIcon = `https://openweathermap.org/img/w/${iconInput}.png`;
          const iconImg = document.querySelector(".imgDiv");
          iconImg.setAttribute("style", "display: initial");
          iconImg.setAttribute("height", "80px");
          iconImg.setAttribute("width", "80px");
          iconImg.src = weatherIcon;

          currentTemp.textContent = `Temp: ${temp} F`;
          currentWeather.textContent = `Weather: ${weather}`;
          currentHumidity.textContent = `Humidity: ${humidity}%`;
          currentWind.textContent = `Wind: ${wind} MPH`;
        });
    });
}
