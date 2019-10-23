"use strict";

let wikiApi =
  "https://ru.wikipedia.org/w/api.php?action=opensearch&origin=*&search=";
let searchBar = document.querySelector("#article-link");
let searchResultDiv = document.querySelector(".search-result");
let hint = document.querySelector("#hint");
let url, searchError, article, titleName, about;

// search wikipedia articles when 'enter' button pressed
searchBar.addEventListener("keypress", e => {
  const key = e.which || e.keyCode;
  if (key === 13) {
    // if div with articles already in document, then delete all data
    if (searchResultDiv.childNodes) {
      searchResultDiv.innerHTML = "";
    }
    // do nothing when input field is empty
    if (searchBar.value === "") {
      hint.hidden = false;
      return;
    }
    // call function and get data
    getData();
  }
});

// get data from api and creates articles elements
const getData = () => {
  url = wikiApi + searchBar.value;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      setContent(data);
    })
    .catch(err => {
      console.log(err);
    });
};

const setContent = data => {
  if (!data[1].length) {
    searchError = document.createElement("div");
    searchError.className = "search-error";
    searchError.className = "search-error";
    searchError.textContent = `Не могу найти статьи всключающие ${searchBar.value}, повторите поиск.`;
    searchResultDiv.appendChild(searchError);
    return;
  } else {
    for (let i = 0; i < data[1].length; i++) {
      article = document.createElement("div");
      article.className = "article";
      article.setAttribute("data-link", data[3][i]);
      titleName = document.createElement("h3");
      titleName.innerHTML = data[1][i];
      about = document.createElement("p");
      if (data[2][i] == "") {
        about.innerHTML = "Без описания";
      } else {
        about.innerHTML = data[2][i];
      }
      appendElements();
    }
  }
};

const appendElements = () => {
  searchResultDiv.appendChild(article);
  article.appendChild(titleName);
  article.appendChild(about);
};

// opens article link on other tab
searchResultDiv.onclick = e => {
  var target = e.target;
  while (target != searchResultDiv) {
    if (target.className == "article") {
      window.open(target.getAttribute("data-link"));
      return;
    }
    target = target.parentNode;
  }
};
