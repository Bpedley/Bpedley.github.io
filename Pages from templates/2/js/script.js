"use strict";

// fixed navbar animation
let navDiv = document.querySelector("#navbar");
let logo = document.querySelector("#logo");
let nav = document.querySelector("nav");
let menu = document.querySelector("#menu");
let menuItems = document.querySelector("#nav-links");
let pageMask = document.querySelector("#page-mask");
let portfolio = document.querySelector("#portfolio");
let mainNavLinks = document.querySelectorAll("#nav-links li a");
let mainSections = document.querySelectorAll("section");
let popUp = document.querySelector("#pop-up");
let closeModal = document.querySelector("#pop-up button");
let windowWidth, scrolled;


// apply new styles when pageY 200px or above when refreshing page
document.addEventListener("DOMContentLoaded", () => {
  windowWidth = window.innerWidth;

  if ((window.pageYOffset || document.documentElement.scrollTop) >= 200) {
    navDiv.style.backgroundColor = "#212529";
    nav.style.height = "54px";
    logo.style.fontSize = "1.25rem";
  }
});


// apply styles when scrolled and document height bellow 200px then delete applied styles
window.onscroll = function() {
  scrolled = window.pageYOffset || document.documentElement.scrollTop;
  windowWidth = window.innerWidth;

  if (windowWidth > 992) {

    if (scrolled >= 200) {
      navDiv.style.backgroundColor = "#212529";
      nav.style.height = "54px";
      logo.style.fontSize = "1.25rem";
    }

    if (scrolled < 200) {
      nav.style.height = "";
      navDiv.style.backgroundColor = "";
      logo.style.fontSize = "";
    }
  }
}


// navbar menu highlight on scroll
window.addEventListener("scroll", event => {
  // add height from fixed navbar
  let fromTop = window.scrollY + 54;
  // iterate through each list item
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


// add modal window pop-up when clicking on images
portfolio.onclick = function(e) {
  // prevent link default state
  e.preventDefault();

  let target = e.target;
  let a = target.closest('a');
  // click outside a elements
  if (!a) return;
  // click on a elements outside portfolio section
  if (!portfolio.contains(a)) return;
  
  pageMask.hidden = false;
  document.body.style.overflow = "hidden";
 
  highlight(a);
}


// add information and some styles to modal pop-up
function highlight(node) {
  let popUp = document.querySelector("#pop-up");
  let image = node.getAttribute("href");
  let list = document.querySelector(".dialog-container ul");
  let img = document.querySelector("#pop-up img");

  img.setAttribute("src", image);

  let captionDiv = node.nextElementSibling;
  let client = captionDiv.children[0].textContent;
  let category = captionDiv.children[1].textContent;

  list.children[1].textContent = `Client: ${client}`;
  list.children[2].textContent = `Category: ${category}`;

  popUp.style.top = window.pageYOffset + "px";
  popUp.style.height = document.documentElement.clientHeight - 30 + "px";

  navDiv.hidden = true;
  popUp.hidden = false;
  popUp.scrollTo(0, 0);
}


// close window when click 'close' button inside modal
closeModal.addEventListener("click", () => {
  navDiv.hidden = false;
  popUp.hidden = true;
  pageMask.hidden = true;
  document.body.style.overflow = "";
});


// show menu items on menu click
menu.addEventListener("click", function() {
  if (!menuItems.style.top || menuItems.style.top != "54px") {
    menuItems.style.top = "54px";
  } else {
    menuItems.style.top = "-255px";
  }
})


// close menu when click on menu item
menuItems.addEventListener("click", function(e) {
  const link = e.target;
  if (link.tagName == "A") {
    menuItems.style.top = "-255px";
  }
})


// change nav style on window resize
window.onresize = function() {
  windowWidth = window.innerWidth;
  scrolled = window.pageYOffset || document.documentElement.scrollTop;
  
  if (windowWidth > 992 && scrolled > 200) {
    navDiv.style.backgroundColor = "#212529";
    nav.style.height = "54px";
    logo.style.fontSize = "1.25rem";
  } else {
    navDiv.style.backgroundColor = "";
    nav.style.height = "";
    logo.style.fontSize = "";
  }
};
