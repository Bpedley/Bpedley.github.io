"use strict";

let hours, minutes, seconds, fullTime;

function getTime() {
  fullTime = new Date();
  hours = fullTime.getHours();
  minutes = fullTime.getMinutes();
  seconds = fullTime.getSeconds();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  document.querySelector("#hour").innerHTML = hours;
  document.querySelector("#minute").innerHTML = ` : ${minutes}`;
  document.querySelector("#second").innerHTML = ` : ${seconds}`;
}

setInterval(getTime, 100);
