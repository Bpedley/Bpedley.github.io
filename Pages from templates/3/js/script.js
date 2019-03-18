"use strict";

const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".menu");
const buttonToTop = document.querySelector(".to-top");


hamburger.addEventListener("click", function(e) {
  // prevent default state of anchor element
  e.preventDefault();
  // show or hide navbar
  if (navbar.style.right == "0px") {
    navbar.style.right = "-250px";
  } else {
    navbar.style.right = "0px";
  }
  // change icon when navbar closed or opened
  if (hamburger.classList.contains("fa-bars")) {
    hamburger.classList.remove("fa-bars");
    hamburger.classList.add("fa-times");
  } else {
    hamburger.classList.remove("fa-times");
    hamburger.classList.add("fa-bars");
  }
})


// click on ToTop button - scroll to top of the page
buttonToTop.addEventListener("click", function() {
  window.scrollTo(0, 0);
})


document.addEventListener("DOMContentLoaded", function() {
  // if page offset more than 200px show ToTop button
  if ((window.pageYOffset || document.documentElement.scrollTop) >= 200) {
    buttonToTop.style.visibility = "visible";
    buttonToTop.style.opacity = "1";
  }
})


window.onscroll = function() {
  let scrolled = window.pageYOffset || document.documentElement.scrollTop;
  // if scrolled 200px or more show ToTop button else hide
  if (scrolled >= 200) {
    buttonToTop.style.visibility = "visible";
    buttonToTop.style.opacity = "1";
  } else {
    buttonToTop.style.visibility = "hidden";
    buttonToTop.style.opacity = "0";
  }
}


navbar.addEventListener("click", function(e) {
  const target = e.target;
  // if click on navbar link - close navbar menu and change icon
  if (target.tagName == "A") {
    navbar.style.right = "-250px";
    hamburger.classList.remove("fa-times");
    hamburger.classList.add("fa-bars");
  }
})
