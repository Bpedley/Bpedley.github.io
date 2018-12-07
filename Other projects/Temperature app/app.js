"use strict";

let api = "https://api.apixu.com/v1/current.json?key=67782be5fbef412d9f1102825180712&q=";

let div = document.getElementById("result");
let submit = document.getElementById("submit");

let temp = document.createElement("p");
let fellsLike = document.createElement("p");
let wind = document.createElement("p");
let dateNow = document.createElement("p");
let timeNow = document.createElement("p");
var icon = document.createElement("img");

icon.id = "icon";
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


submit.addEventListener("click", () => {
  div.innerHTML = "";

  var city = document.getElementById("city").value;
  let url = api + city;

  let request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function () {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      // icon
      icon.src = "" + data.current.condition.icon;
      // temperature
      temp.innerHTML = `Temperature: ${Math.round(data.current.temp_c)}<sup><span id="celsius">&#8451;</span></sup>, ${data.current.condition.text}.`;
      // feels like
      fellsLike.innerHTML = `Feels like: ${Math.round(data.current.feelslike_c)}<sup><span id="celsius">&#8451;</span></sup>.`;
      // location
      let location = document.createElement("p");
      location.textContent = `Location: ${data.location.country}, ${data.location.name}.`;
      // date and time
      let dateTime = (data.location.localtime).split(" ");
      let date = new Date(dateTime[0]);
      let time = dateTime[1];
      dateNow.textContent = `Current date: ${date.toLocaleDateString("en-US", options)}.`;
      timeNow.textContent = `Current time: ${time}.`;
      // wind speed
      wind.textContent = `Wind speed: ${data.current.wind_kph} km/h.`;
      // append to document
      div.appendChild(icon);
      div.appendChild(location);
      div.appendChild(temp);
      div.appendChild(fellsLike);
      div.appendChild(wind);
      div.appendChild(timeNow);
      div.appendChild(dateNow);
    } else {
      let error = document.createElement("p");
      error.textContent = `Can't find ${city}, try again.`;
      div.appendChild(error);
    }
  }

  request.send();
});
