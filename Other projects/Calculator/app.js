let keys = document.querySelector(".keys");
let calcValue = document.querySelector(".calc-value");
let fullExp = document.querySelector("#exp");
let exp, regex, target, result;

// add click event on all calculator buttons using event delegation
keys.onclick = function(e) {
  target = e.target;

  // if clear button clicked
  if (target.classList.contains("all-clear")) {
    // clear value in calcValue
    calcValue.value = 0;
    // remove exp value if exists
    if (exp) {
      exp = null;
    }
  }

  // if number button clicked
  if (target.classList.contains("number")) {
    // call function to display value of clicked button
    highlightNumber(target);
    // remove exp value if exists, remove value in calcValue
    if (exp) {
      exp = null;
      calcValue.value = 0;
      highlightNumber(target);
    }
  }

  // if decimal button clicked
  if (target.classList.contains("decimal")) {
    // call function to add decimal point
    addDecimalPoint(target);
  }

  // if operator button clicked
  if (target.classList.contains("operator")) {
    // call function to add operator
    addOperator(target);
  }

  // if equal button clicked
  if (target.classList.contains("equal")) {
    // call function to calculate result
    calculateValue();
  }
};

function highlightNumber(node) {
  // using regex, split calcValue into array and store last item
  regex = String(calcValue.value)
    .split(/[\-\+\*\/]/)
    .slice(-1);
  /*
  if:
  -calculated value exists
  -regex first letter and button value 0
  -calcValue length bigger or equal 17
  do nothing
  */
  if (
    exp ||
    (regex.slice(0, 1) == "0" && node.value == 0) ||
    String(calcValue.value).length >= 17
  )
    return;
  // if calcValue = 0 and length = 1
  if (calcValue.value == 0 && String(calcValue.value).length == 1) {
    // calcValue = clicked button value
    calcValue.value = node.value;
  } else {
    // add to calcValue clicked button value
    calcValue.value += node.value;
  }
}

function addDecimalPoint(node) {
  // using regex, split calcValue into array and store first letter of last item
  regex = String(calcValue.value)
    .split(/[\-\+\*\/]/)
    .slice(-1)[0];
  // if regex have dot, empty string or exp value exists - do nothing
  if (regex.includes(".") || regex == "" || exp) return;
  // add to calcValue decimal point
  calcValue.value += node.value;
}

function calculateValue() {
  // using regex, split calcValue into array and store last item
  regex = String(calcValue.value)
    .split(/[\-\+\*\/]/)
    .slice(-1);
  // if 2 value is empty - don't calculate
  if (regex != "") {
    exp = calcValue.value;
    // show only 17 letters result
    calcValue.value = String(eval(exp)).slice(0, 17);
  }
}

function addOperator(node) {
  // store result of calcValue field
  result = String(calcValue.value);
  // if exp value exists and result length above 17
  if (exp && result.length < 17) {
    exp = null;
    calcValue.value += node.value;
    // if result length bigger or equal 17 - do nothing
  } else if (result.length >= 17) {
    return;
    // if last letter in calcValue operator - change to different if clicked not the same
  } else if ("+-/*".indexOf(result.charAt(result.length - 1)) >= 0) {
    calcValue.value = result.slice(0, -1) + node.value;
    // add operator
  } else {
    calcValue.value += node.value;
  }
}
