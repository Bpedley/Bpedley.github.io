let keys = document.querySelector(".keys");
let calcValue = document.querySelector(".calc-value");
let fullExp = document.querySelector("#exp");
let lastPart, operator, currentPart;


keys.onclick = function(e) {
  var target = e.target;

  if (target.classList.contains("all-clear")) {
    calcValue.value = 0;
  }

  if (target.classList.contains("number")) {
    highlightNumber(target);
  }

  if (target.classList.contains("decimal")) {
    addDecimalPoint(target);
  }

  if (target.classList.contains("operator")) {
    addOperator(target);
  }

  if (target.classList.contains("equal")) {
    calculateValue();
  }
};


function highlightNumber(node) {
  if (calcValue.value == 0 && String(calcValue.value).length == 1) {
    calcValue.value = node.value;
  } else if(String(calcValue.value).length >= 15) {
    return;
  } else {
    calcValue.value += node.value;
  }
}


function addDecimalPoint(node) {
  let regex = String(calcValue.value).split(/[\-\+\*\/]/).slice(-1)[0];
  
  if (regex.includes(".")) return;

  calcValue.value += node.value;
}


function calculateValue() {
  let exp = calcValue.value;

  if (exp) {
    calcValue.value = eval(exp);
  }
}


function addOperator(node) {
  let res = String(calcValue.value);

  if ("+-/*".indexOf(res.charAt(res.length - 1)) >= 0) {
    calcValue.value = res.slice(0, -1) + node.value;
  } else {
    calcValue.value += node.value;
  }
}
