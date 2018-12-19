"use strict";

// fixed navbar animation
window.onscroll = function() {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  var navDiv = document.querySelector("#navbar");
  var logo = document.querySelector("#logo");
  var nav = document.querySelector("nav");
  if (scrolled >= 200) {
    navDiv.style.backgroundColor = "#212529";
    nav.style.height = "54px";
    logo.style.fontSize = "20px";
  }
  if (scrolled < 200) {
    nav.style.height = "";
    navDiv.style.backgroundColor = "";
    logo.style.fontSize = "";
  }
}


let mainNavLinks = document.querySelectorAll("nav ul li a");
let mainSections = document.querySelectorAll("section");

let lastId;
let cur = [];

window.addEventListener("scroll", event => {
  let fromTop = window.scrollY + 54;

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.style.color = "#fed136";
    } else {
      link.style.color = "";
    }
  });
});