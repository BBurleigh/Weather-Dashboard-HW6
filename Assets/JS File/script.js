var APIKey = "f3659936b4dd484b16332e8037972e1e";

var currentCity = "";

var lastCity = ""

function getApi() {

var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

let city = `${city}`;

currentCity = city;

fetch(queryURL)
  .then(((function (response) {
    return response.json();
  })
  .then(function (response) {
    recallCity(city);

    let currentWeatherIcon = "https://openweathermap.org/img/w/" + response.weather[0].icon + "png";

    let presentTimeUTC = response.dt;

    let presentTimeZoneOffset = response.timezone;

    let currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 . 60;

    
  })))

  
}

$('#search-button').on('click', (event) => {

  event.preventDefault();

  $('#search-city').val(event.target.textContent);

  currentCity = $('#search-city').val();

  getApi(event);

})

getApi()

