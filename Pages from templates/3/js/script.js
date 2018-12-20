"use strict";

// fixed navbar animation
let navDiv = document.querySelector("#navbar");
let logo = document.querySelector("#logo");
let nav = document.querySelector("nav");

// apply new styles when document height 200px or above
document.addEventListener("DOMContentLoaded", () => {
  if ((window.pageYOffset || document.documentElement.scrollTop) >= 200) {
    navDiv.style.backgroundColor = "#212529";
    nav.style.height = "54px";
    logo.style.fontSize = "20px";
  }
});

// apply same styles when scrolled and when document height bellow 200px delete applied styles
window.onscroll = function() {
  let scrolled = window.pageYOffset || document.documentElement.scrollTop;
  
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


// navbar menu highlight on scroll
let mainNavLinks = document.querySelectorAll("#nav-links li a");
let mainSections = document.querySelectorAll("section");
let lastId;
let cur = [];

window.addEventListener("scroll", event => {
  // add height from fixed navbar
  let fromTop = window.scrollY + 54;
  // iterate through each li
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

// smooth scroll animation on menu items
$(document).ready(function(){
  $('#nav-links a[href^="#"], .button').on('click', function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').animate({
      'scrollTop': $target.offset().top - 54
    }, 1000, 'swing');
  });
});
