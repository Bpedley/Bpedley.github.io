"use strict";

let api = "https://api.apixu.com/v1/current.json?key=67782be5fbef412d9f1102825180712&q=";
let div = document.getElementById("result");
let submit = document.getElementById("submit");
var input = document.querySelector("input");

let divIcon = document.createElement("div");
let divInfo = document.createElement("div");
let iconImage = document.createElement("img");
let loc = document.createElement("p");
let temp = document.createElement("p");
let feelsLike = document.createElement("p");
let wind = document.createElement("p");
let dateNow = document.createElement("p");
let timeNow = document.createElement("p");

divIcon.id = "icon";
divInfo.id = "info";
iconImage.id = "img";

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


// Execute a function when the user releases a enter key on the keyboard
input.addEventListener("keyup", (e) => {
  // Cancel the default action, if needed
  e.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (e.keyCode === 13) {
    // Trigger the button element with a click
    submit.click();
  }
});


// Execute a function when the user clicks on button
submit.addEventListener("click", () => {
  div.innerHTML = "";

  let city = document.getElementById("city").value;
  // check if input field value is empty
  if (city == "") {
    let empty = document.createElement("p");
    empty.textContent = `You didn't enter anything, try again.`;
    div.appendChild(empty);
    return;
  }
  
  let url = api + city;

  let request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function () {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      // icon
      iconImage.src = "" + data.current.condition.icon;
      // temperature
      temp.innerHTML = `Temperature: ${Math.round(data.current.temp_c)}<span id="celsius">&deg;</span>, ${data.current.condition.text}.`;
      // feels like
      feelsLike.innerHTML = `Feels like: ${Math.round(data.current.feelslike_c)}<span id="celsius">&deg;</span>.`;
      // location
      loc.textContent = `Location: ${data.location.country}, ${data.location.name}.`;
      // date and time
      let dateTime = (data.location.localtime).split(" ");
      let date = new Date(dateTime[0]);
      let time = dateTime[1];
      dateNow.textContent = `Current date: ${date.toLocaleDateString("en-US", options)}.`;
      timeNow.textContent = `Current time: ${time}.`;
      // wind speed
      wind.textContent = `Wind speed: ${data.current.wind_kph} km/h.`;
      // append to document
      div.appendChild(divIcon);
      div.appendChild(divInfo);
      divIcon.appendChild(iconImage);
      divInfo.appendChild(loc);
      divInfo.appendChild(temp);
      divInfo.appendChild(feelsLike);
      divInfo.appendChild(wind);
      divInfo.appendChild(timeNow);
      divInfo.appendChild(dateNow);
    } else {
      let error = document.createElement("p");
      error.className = "error";
      error.textContent = `Can't find ${city}, try again.`;
      div.appendChild(error);
    }
  }

  request.send();
});
