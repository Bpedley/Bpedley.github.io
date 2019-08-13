const mainNavLinks = document.querySelectorAll(".nav-items li a");
const burger = document.querySelector(".burger");
const navbar = document.querySelector(".navbar");

// highlight link item on page load
window.addEventListener("load", () => {
  let fromTop = window.scrollY;
  cycleLinks(fromTop);
});

// highlight link item on scroll
window.addEventListener("scroll", () => {
  let fromTop = window.scrollY;
  cycleLinks(fromTop);
});

// change class on clicking burger button
burger.addEventListener("click", () => {
  if (navbar.classList.contains("nav-closed")) {
    navbar.style.transition = "height 0.3s ease-in-out";
    navbar.classList.replace("nav-closed", "nav-opened");
  } else if (navbar.classList.contains("nav-opened")) {
    navbar.style.transition = "height 0.3s ease-in-out";
    navbar.classList.replace("nav-opened", "nav-closed");
  }
});

// iterate through all the links
function cycleLinks(fromTop) {
  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.style.color = "#fff";
    } else {
      link.style.color = "";
    }
  });
}

// close navbar on link click
navbar.addEventListener("click", function(e) {
  const target = e.target;
  // if click on menu link - close
  if (target.tagName == "A" && !target.classList.contains("burger")) {
    navbar.classList.replace("nav-opened", "nav-closed");
  }
});

// delete navbar transition effect on window resize
window.onresize = function() {
  navbar.style.transition = "none";
};
