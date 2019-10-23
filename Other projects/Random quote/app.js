"use strict";

const url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857"
];
const quoteDiv = document.querySelector(".quote");
const quoteText = document.querySelector("#quote-text");
const authorName = document.querySelector("#quote-author");
const newQuoteButton = document.querySelector("#new-quote");
const twitterButton = document.querySelector("#twitter");
const tweetUrl = "https://twitter.com/intent/tweet?hashtags=quotes&text=";
let data, quote, color;

// get random quote
function randomQuote() {
  return [
    data[Math.floor(Math.random() * data.length)].quote,
    data[Math.floor(Math.random() * data.length)].author
  ];
}

// get random color from array
function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// set content of quote div
function setContent() {
  // call functions and store result
  quote = randomQuote();
  color = randomColor();
  // set quote and author
  quoteText.textContent = quote[0];
  authorName.textContent = "- " + quote[1];
  // set tweet link with quote text and author
  twitterButton.setAttribute("href", tweet(quote[0], quote[1]));
  // center the quote div on page
  quoteDiv.style.marginTop = "-" + parseInt(quoteDiv.offsetHeight / 2) + "px";
  // apply color style on elements
  document.body.style.backgroundColor = color;
  quoteText.style.color = color;
  authorName.style.color = color;
  twitterButton.style.backgroundColor = color;
  newQuoteButton.style.backgroundColor = color;
}

// get data using fetch
function getQuotes(url) {
  fetch(url).then(response => {
    response.json().then(json => {
      data = json.quotes;
      setContent();
    });
  });
}

// set the link to tweet button
function tweet(quote, author) {
  return tweetUrl + encodeURIComponent(`"${quote}" ${author}`);
}

// Change content of quote div on button click
newQuoteButton.addEventListener("click", setContent);

getQuotes(url);
