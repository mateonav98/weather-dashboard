

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


apiKey = "c46f2990592153f3323f237a20612ab6"
// city = "San Jose, California"

var searchBtn = document.querySelector('#searchBtn');
var citySearch = document.querySelector('#citySearch');
var searchDataEl = document.querySelector("#searchData")
var currentDate = moment().format("MM/DD/YYYY");
var searches = [];


function renderSearches() {

  var city = JSON.parse(localStorage.getItem("searches"));
//If either email or password is null, we exit the function with return. Otherwise, we render the values using the textContent property in the userEmailSpan and userPasswordSpan elements
  if (!city) {
    searches = city
    return;
  }
}

function storeSearches() {
  localStorage.setItem("searches", JSON.stringify(searches));
}

searchBtn.addEventListener("click", function(event) {

  var city = citySearch.value;
  console.log(city)
  if (city) {
    weatherData(city)
  } else {
    alert("Could not find city");
    return;
  }
  searches.push(city)
  citySearch.value = ""
  
  renderSearches();
  storeSearches();
 $("#searchData").text(searches + " ")
return

});



function weatherData(city) {
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
          $("#currentDate").text("Hello, today is " + currentDate)
          $("#cityName").text("In " + cityName + "...");
          $("#temp").text("Today's Temperature: " + Math.round((data.current.temp - 273.25) * (9/5) + 32) + " °F");
          $("#weatherIcon").attr({"src":"http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png"}); 
          $("#humidity").text("Humidity: " + data.current.humidity + "%");
          $("#windSpeed").text("Current Wind Speed: " + data.current.wind_speed + " mph");
          $("#UVindex").text("UV Index: " + data.current.uvi);
          // Day 1 Forcast
          $("#day1").text(moment().add(1, 'day').format("MMM Do, YYYY"));
          $("#icon1").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png"});
          $("#temp1").text("Temp: " + Math.round((data.daily[1].temp.day - 273.25) * (9/5) + 32) + " °F");
          $("#humidity1").text("Humidity: " + data.daily[1].humidity + "%");
          // Day 2 Forcast
          $("#day2").text(moment().add(2, 'day').format("MMM Do, YYYY"));
          $("#icon2").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png"});
          $("#temp2").text("Temp: " + Math.round((data.daily[2].temp.day - 273.25) * (9/5) + 32) + " °F");
          $("#humidity2").text("Humidity: " + data.daily[2].humidity + "%");
          // Day 3 Forcast
          $("#day3").text(moment().add(3, 'day').format("MMM Do, YYYY"));
          $("#icon3").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png"});
          $("#temp3").text("Temp: " + Math.round((data.daily[3].temp.day - 273.25) * (9/5) + 32) + " °F");
          $("#humidity3").text("Humidity: " + data.daily[3].humidity + "%");
          // Day 4 Forcast
          $("#day4").text(moment().add(4, 'day').format("MMM Do, YYYY"));
          $("#icon4").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png"});
          $("#temp4").text("Temp: " + Math.round((data.daily[4].temp.day - 273.25) * (9/5) + 32) + " °F");
          $("#humidity4").text("Humidity: " + data.daily[4].humidity + "%");
          // Day 5 Forcast
          $("#day5").text(moment().add(5, 'day').format("MMM Do, YYYY"));
          $("#icon5").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + ".png"});
          $("#temp5").text("Temp: " + Math.round((data.daily[5].temp.day - 273.25) * (9/5) + 32) + " °F");
          $("#humidity5").text("Humidity: " + data.daily[5].humidity + "%");
        })
})
    return
}