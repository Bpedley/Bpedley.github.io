"use strict";

// api link without location
const api = "https://api.apixu.com/v1/current.json?key=67782be5fbef412d9f1102825180712&q=";
// format for date object
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// get elements from html page
const div = document.getElementById("result");
const submit = document.getElementById("submit");
const input = document.querySelector("input");
// create elements
const divIcon = document.createElement("div");
const divInfo = document.createElement("div");
const iconImage = document.createElement("img");
const loc = document.createElement("p");
const temp = document.createElement("p");
const feelsLike = document.createElement("p");
const wind = document.createElement("p");
const dateNow = document.createElement("p");
const timeNow = document.createElement("p");
// creating id's for some created elements
divIcon.id = "icon";
divInfo.id = "info";
iconImage.id = "img";


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
  // clear result div after clicking on button or pressing enter in input field
  div.innerHTML = "";

  let city = document.getElementById("city").value;
  // check if input field value is empty
  if (city == "") {
    let empty = document.createElement("p");
    empty.textContent = `You didn't enter anything, try again.`;
    div.appendChild(empty);
    return;
  }
  // full api link with location
  let url = api + city;
  // Create a request variable and assign a new XMLHttpRequest object to it.
  let request = new XMLHttpRequest();
  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', url, true);
  request.onload = function () {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response);
    // if no errors
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
      // append elements to document
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
      // if error happend
      let error = document.createElement("p");
      error.className = "error";
      error.textContent = `Can't find ${city}, try again.`;
      div.appendChild(error);
    }
  }
  // send request
  request.send();
});
