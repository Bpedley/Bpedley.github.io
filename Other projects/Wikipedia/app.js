"use strict";

let wikiApi = "https://ru.wikipedia.org/w/api.php?action=opensearch&search=";
let searchBar = document.querySelector("#article-link");
let searchResultDiv = document.querySelector(".search-result");
let hint = document.querySelector("#hint");

// search wikipedia articles when 'enter' button pressed
searchBar.addEventListener("keypress", (e) => {
  var key = e.which || e.keyCode;
  
  if (key === 13) {
    // if div with articles already in document, then delete all data
    if (searchResultDiv.childNodes) {
      hint.hidden = false;
      searchResultDiv.innerHTML = "";
    }
    // do nothing when input field is empty
    if (searchBar.value === "") return;
    // call function and get data
    getData();
  }
})

// get data from api and creates articles elements
function getData() {
  let search = wikiApi + searchBar.value;
  let request = new XMLHttpRequest();

  request.open('GET', search, true);

  request.onload = function () {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response);
    // if no errors
    if (request.status >= 200 && request.status < 400) {
      console.log(data);
      hint.hidden = true;
      // if result dont have data
      if (data[1].length == 1) {
        let searchError = document.createElement("div");
        searchError.className = "search-error";
        searchError.textContent = `Не могу найти статьи всключающие ${searchBar.value}, повторите поиск.`;
        searchResultDiv.appendChild(searchError);
        return;
      }

      for (let i = 0; i < data[1].length; i++) {
        let article = document.createElement("div");
        article.className = "article";
        article.setAttribute("data-link", data[3][i]);

        let titleName = document.createElement("h3");
        titleName.innerHTML = data[1][i];

        let about = document.createElement("p");
        if (data[2][i] == "") {
          about.innerHTML = "Без описания";
        } else {
          about.innerHTML = data[2][i];
        }

        searchResultDiv.appendChild(article);
        article.appendChild(titleName);
        article.appendChild(about);
      }
    } else {
      // if error happened
      console.log("Error happened");
    }
  }
  // send request
  request.send();
}

// opens article link on other tab
searchResultDiv.onclick = function(e) {
  var target = e.target;

  while (target != searchResultDiv) {
    if (target.className == 'article') {
      window.open(target.getAttribute("data-link"));
      return;
    }

    target = target.parentNode;
  }
}
