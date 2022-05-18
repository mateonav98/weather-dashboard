// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, a
// n icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// let city = document.querySelector("#citySearch")

apiKey = "c46f2990592153f3323f237a20612ab6"
city = "San Jose, California"


function weatherData (city) {
  let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
  fetch(queryUrl)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }})
    .then(function(data){
      console.log(data);
      cityName = data.name
      console.log (data.name)
      lonData = data.coord.lon
      console.log(data.coord.lon)
      latData = data.coord.lat
      console.log(data.coord.lat);
      var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latData + "&lon=" + lonData + "&appid=" + apiKey;
            fetch(apiURL)
                .then(function (response) {
                  if (response.ok) {
                    return response.json()
                }})
                .then(function (data) {
                    console.log(data);
                    $("#cityName").text(cityName);
                    $("#temp").text("Today's Temperature: " + data.current.temp + " °C");
                    $("#weatherIcon").attr({"src":"http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png"});                    $("#humidity").text("Humidity: " + data.current.humidity + "%");
                    $("#windSpeed").text("Current Wind Speed: " + data.current.wind_speed + " mph");
                    $("#UVindex").text("UV Index: " + data.current.uvi);
    })
    })}


  

  weatherData (city)