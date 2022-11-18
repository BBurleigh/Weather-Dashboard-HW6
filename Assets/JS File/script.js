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

    let currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;

    
  })))

  
}

saveCity(newCity) {
  let cityExists = false;
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage["cities" + i] === newCity) {
      cityExists = true;
      break;
    }
  }
  if (cityExists = false) {
    localStorage.setItem("cities" + localStorage.length, newCity);
  }

}

function renderCities() {
  $('#city-results').empty();
  if (localStorage.length = 0) {
    if (lastCity) {
    $('#search-city').attr("value", lastCity);
  } else {
    $('#search-city').attr("value", "Austin");
         }
    } else {

      let lastCityKey = "cities" + (localStorage.length - 1);

      lastCity = localStorage.getItem(lastCityKey);

      $('#search-city').attr("value", lastCity);

      for (let i = 0; i < localStorage.length; i++) {

        let city = localStorage.getItem("cities" + 1);
        
        let cityEl;

        if (currentCity === ""){

          cityEl = `<button type = "button" class = "list-group-item list-group-item-action active">${city}<button></li>`;

        } else {

          cityEl = `<button type = "button" class = "list-group-item list-group-item-action">${city}<button></li>`;

        }

        $('#city-results').prepend(cityEl);

      }

      if (localStorage.length > 0) {

        $('#clear-storage').html($('<a id = "clear-storage" href = "#"> clear </a>'));

      } else {

        $('#clear-storage').html("");

      }

    }
}

$('#search-button').on('click', (event) => {

  event.preventDefault();

  $('#search-city').val(event.target.textContent);

  currentCity = $('#search-city').val();

  getApi(event);

})

$('#city-results').on('click', (event) => {
  event.preventDefault();
  $('#search-city').val(event.target.textContent);
  currentCity = $('#search-city').val();
  getCurrentConditions(event);
})

$("#clear-storage").on('click', (event) => {
  localStorage.clear();
  renderCities();
})

renderCities();

getApi()

