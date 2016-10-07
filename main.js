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
        updateDOM("equation", equation);
    }
}

// function calculateResult() {
//     var illegalExpression = /[\/\*][\/\*]/; // matches two characters: each is either * or /
//     var twoPlusOrMinus = /(\+\+|\-\-)/ // matches two pluses together OR two minuses together
//     var alsoIllegal = /[\+\-][\*\/]/; // matches two characters; first is + or -, second is * or /
//     if ( (illegalExpression.test(equation) && equation.match(illegalExpression) != "**") || alsoIllegal.test(equation) ) {
//         result = "Illegal!!";
//     } else if (twoPlusOrMinus.test(equation)) {
//         result = "Javascript don't like it";
//     } else {
//         result = eval(equation);
//     }
//     updateDOM("result", result);
//     equation = result;
// }

function calculateResult() {
    if (checkMalformedExpression() === true) {
        updateDOM("result", "Malformed expression");
    } else {
        result = eval(equation);
        updateDOM("result", result);
        equation = result;
    }
}

function clearResult() {
    result = 0;
    equation = "";
    updateDOM("result", result);
    updateDOM(equation, "0");
}

function clearLast() {
  var lastDigit = equation[equation.length - 1];
  if (lastDigit === "+" || lastDigit === "-" || lastDigit === "*" || lastDigit === "/") {
    equation = equation.slice(0, equation.length -1);
  } else {
    var operators = /[\/\+\-\*]/g; // To match all arithmetic operators
    var tempArray = equation.split(operators);
    var lastElementLength = tempArray[tempArray.length -1].length;
    equation = equation.slice(0, equation.length - lastElementLength);
  }
  checkLastDigit();
}

function updateDOM(target, content) {
    document.getElementById(target).innerHTML = "<p>" + content + "</p>";
    // if (target === "equation") {
    //     document.getElementById("equation").innerHTML = "<p>" + equation + "</p>";
    // } else if (target === "result") {
    //     document.getElementById("result").innerHTML = "<p>" + result + "</p>";
    // } else if (target === "zero") {
    //     document.getElementById("equation").innerHTML = "<p>0</p>";
    // }
}

function checkLastDigit() {
    if (equation.length === 0) {
        updateDOM("equation", "0");
    } else {
        updateDOM("equation", equation);
    }
}

function checkMalformedExpression () {
    var operationArray = equation.split(/\d{1,}/g).filter(function(el) {return el.length != 0});
    var isMalformed = false;
    var allowedOperations = ["+-", "-+", "**", "*+", "*-", "/-", "/+", "+", "-", "*", "/"]
    for (var i = 0; i < operationArray.length; i++) {
        if (operationArray[i] != ()) {
            isMalformed = true;
            console.log(operationArray[i]);
            console.log(isMalformed);
            break;
        } else {
            isMalformed = false;
        }
    }
    return isMalformed;
}