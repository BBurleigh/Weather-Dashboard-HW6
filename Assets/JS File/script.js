var APIKey = "f3659936b4dd484b16332e8037972e1e";

var city;

var temp;

var wind;

var humidity;

var UVIndex;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?city=" + city + "&appid=" + APIKey;

fetch(queryURL);