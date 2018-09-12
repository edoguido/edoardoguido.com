var weather;
var path = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'Monza'
var units = '&units=metric';
var call = path + city + units + '&APPID=95c1ca03f29553b88567ea0e2a40124b';

var selected = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  loadJSON(call, gotData);
}

function gotData(data) {
  weather = data;
  console.log(weather);
  selected.push(weather.main.temp);
  selected.push(weather.main.humidity);
}

function draw() {
  background(255);
  fill(0);
  textSize(24);
  text(city, 10, 30);

  if (weather) {
    fill(0);
    noStroke();
    for (i = 0; i < selected.length; i++) {
      ellipse(100 + (i * 200), 200, selected[i], selected[i]);
    }
  }
}