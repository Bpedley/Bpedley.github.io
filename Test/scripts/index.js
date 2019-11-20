// filter images by group
const mixer = mixitup(".container");

// html elements
const filterButtons = document.querySelector(".filter-buttons");
const buttons = filterButtons.querySelectorAll(".btn");
const navbar = document.querySelector("header");
const logo = document.querySelector(".logo > img");
const burgerBtn = document.querySelector(".burger");
const mavLinks = document.querySelector(".nav-links");
const buttonToTop = document.querySelector(".scroll-up");
const nav = document.querySelector("nav");

// open or close menu on click
burgerBtn.addEventListener("click", () => {
  if (!mavLinks.style.display) {
    mavLinks.style.display = "flex";
  } else {
    mavLinks.style.display = "";
  }
});

// apply active class on button
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", e => {
    const current = document.getElementsByClassName("btn-active");
    current[0].className = current[0].className.replace(" btn-active", "");
    e.target.className += " btn-active";
  });
}

// apply new styles when pageY 200px or above when refreshing page
if (document.readyState !== "loading") {
  onReady();
} else {
  document.addEventListener("DOMContentLoaded", onReady);
}

function onReady() {
  if ((window.pageYOffset || document.documentElement.scrollTop) >= 200) {
    navbar.className = "position-after";
  } else {
    navbar.className = "";
  }
}

// change navbar class when scrolling
window.onscroll = function() {
  const scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled >= 200) {
    navbar.className = "position-after";
  } else {
    navbar.className = "";
  }
};

// click on button - scroll to top of the page
buttonToTop.addEventListener("click", function() {
  window.scrollTo(0, 0);
});

// close navbar menu on item click
nav.addEventListener("click", function(e) {
  const target = e.target;
  if (target.tagName == "A") {
    mavLinks.style.display = "";
  }
});
