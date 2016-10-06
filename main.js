document.addEventListener('DOMContentLoaded', start);

function start () {
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", getButton);
    }
}

var equation = "";
var result = 0;

function getButton(evt) {
    if (evt.target.id === "AC") {
        clearResult();
    } else if (evt.target.id === "CE") {
        clearLast();
    } else if (evt.target.id === "equals") {
        calculateResult();
    } else {
        equation += evt.target.value;
        updateDOM("equation");
    }
}

function calculateResult() {
    var illegalExpression = /[\/\*][\/\*]/; // matches two characters: each is either * or /
    var twoPlusOrMinus = /(\+\+|\-\-)/ // matches two pluses together OR two minuses together
    var alsoIllegal = /[\+\-][\*\/]/; // matches two characters; first is + or -, second is * or /
    if ( (illegalExpression.test(equation) && equation.match(illegalExpression) != "**") || alsoIllegal.test(equation) ) {
        result = "Illegal!!";
    } else if (twoPlusOrMinus.test(equation)) {
        result = "Javascript don't like it";
    } else {
        result = eval(equation);
    }
    // console.log(result);
    updateDOM("result");
    equation = "";
    equation = result;
}

function clearResult() {
    result = 0;
    equation = "";
    updateDOM("result");
    updateDOM("zero");
    // console.log(result);
}

function clearLast() {
  var lastDigit = equation[equation.length - 1];
  if (lastDigit === "+" || lastDigit === "-" || lastDigit === "*" || lastDigit === "/") {
    equation = equation.slice(0, equation.length -1);
    // updateDOM("equation");
  } else {
    var operators = /[\/\+\-\*]/g; // To match all arithmetic operators
    var tempArray = equation.split(operators);
    var lastElementLength = tempArray[tempArray.length -1].length;
    equation = equation.slice(0, equation.length - lastElementLength);
  }
  checkLastDigit();
}

function updateDOM(target) {
    if (target === "equation") {
        document.getElementById("equation").innerHTML = "<p>" + equation + "</p>";
    } else if (target === "result") {
        document.getElementById("result").innerHTML = "<p>" + result + "</p>";
    } else if (target === "zero") {
        document.getElementById("equation").innerHTML = "<p>0</p>";
    }
}

function checkLastDigit() {
    if (equation.length === 0) {
        updateDOM("zero");
    } else {
        updateDOM("equation");
    }
}