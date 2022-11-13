var APIKey = "f3659936b4dd484b16332e8037972e1e";

function getApi() {

var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    console.log(data.main.temp)
  })

  
}

getApi()

