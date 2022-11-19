var APIKey = "f3659936b4dd484b16332e8037972e1e";

var currentCity = "";

var lastCity = ""

function getApi() {

let city = document.getElementById("search-city").value;

currentCity = city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)
  .then((response) => {
    return response.json();
  })
  .then((response) => {

    saveCity(city);

    var icon = response.current.weather[0].icon;

    var currentWeatherIcon = "https://openweathermap.org/img/w/" + icon + ".png";

    var presentTimeUTC = response.dt;

    var presentTimeZoneOffset = response.timezone;

    var presentTimeZoneOffsetHours = presentTimeZoneOffset / 60 / 60;

    var thisMoment = moment.unix(presentTimeUTC).utc().utcOffset(presentTimeZoneOffsetHours)

    renderCities();

    getFiveDayForecast();

    $('#header-text').text(response.name);

    let currentWeatherHTML = 
    `
    <h3>${response.name} ${thisMoment.format("(MM/DD/YY)")}<img src="${currentWeatherIcon}"></h3>
            <ul class="list-unstyled">
                <li>Temperature: ${response.main.temp}&#8457;</li>
                <li>Humidity: ${response.main.humidity}%</li>
                <li>Wind Speed: ${response.wind.speed} mph</li>
                <li id="uvIndex">UV Index:</li>
            </ul>`;

            $('#current-weather').html(currentWeatherHTML);

            let latitude = response.coord.lat;

            let longitude = response.coord.lon;

            let uvQueryURL = "api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&APPID=" + owmAPI;
            
            uvQueryURL = "https://cors-anywhere.herokuapp.com/" + uvQueryURL;

            fetch(uvQueryURL)
            
            .then((response) => {

                return response.json();

            })
            .then((response) => {

                let uvIndex = response.value;

                $('#uvIndex').html(`UV Index: <span id="uvVal"> ${uvIndex}</span>`);

                if (uvIndex>=0 && uvIndex<3) {
                    
                  $('#uvVal').attr("class", "uv-favorable");

                } else if (uvIndex >= 3 && uvIndex < 8) {

                    $('#uvVal').attr("class", "uv-moderate");

                } else if (uvIndex >= 8) {

                    $('#uvVal').attr("class", "uv-severe");

                }
            });
        })
}

function getFiveDayForecast() {

  let city = $('#search-city').val();
    
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&APPID=" + APIKey;
    
    fetch(queryURL)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
        
        let fiveDayForecastHTML = `
        <h2>5-Day Forecast:</h2>
        <div id="fiveDayForecastUl" class="d-inline-flex flex-wrap ">`;
        
        for (let i = 0; i < response.list.length; i++) {
            let dayData = response.list[i];

            let dayTimeUTC = dayData.dt;

            let timeZoneOffset = response.city.timezone;

            let timeZoneOffsetHours = timeZoneOffset / 60 / 60;

            let thisMoment = moment.unix(dayTimeUTC).utc().utcOffset(timeZoneOffsetHours);

            let iconURL = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
            
            if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {

                fiveDayForecastHTML += `
                <div class="weather-card card m-2 p0">
                    <ul class="list-unstyled p-3">
                        <li>${thisMoment.format("MM/DD/YY")}</li>
                        <li class="weather-icon"><img src="${iconURL}"></li>
                        <li>Temp: ${dayData.main.temp}&#8457;</li>
                        <br>
                        <li>Humidity: ${dayData.main.humidity}%</li>
                    </ul>
                </div>`;

            }
        }
        
        fiveDayForecastHTML += `</div>`;
        
        $('#five-day-forecast').html(fiveDayForecastHTML);
    })
}

function saveCity(newCity) {

  for (let i = 0; i < localStorage.length; i++) {

    let cityExists = false;

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

getApi();

