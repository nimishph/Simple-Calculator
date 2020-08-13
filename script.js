let equation = "";
let buffer = [0, "+", 0];
const equationScreen = document.querySelector(".display-equation");
const resultScreen = document.querySelector(".display-result");

function updateResult() {
    resultScreen.innerText = buffer[0];    
}

function updateEquation(value) {
    if (value === "back") {
        equation = equation.substr(0, equation.length-1);
    } else if (isNaN(value)) {
        if (equation.length === 0)
            equation += "0";
        switch(value) {
            case "+":
                equation += "+";
                break;
            case "-":
                equation += "-";
                break;
            case "×":
                equation += "×";
                break;
            case "÷":
                equation += "÷";
                break;  
            case "=":
                equation += "=";
                break;
        }
    } else {
        equation += value;
    }
    equationScreen.innerText = equation;
}

function replaceOperator(value) {
    buffer[1] = value;
    equation = equation.substr(0, equation.length-1);
}

function updateBuffer(value) {
    const lastOperator = buffer[1];
    let operand1 = buffer[0];
    let operand2 = buffer[2];
    if (isNaN(value)) {
        if (value !== "=" && isNaN(equation.charAt(equation.length-1)))
            replaceOperator(value);
        else {
            if (value === "=" && isNaN(equation.charAt(equation.length-1))) {
                operand2 = operand1;
                equation += operand2.toString();
            }
            if (lastOperator === "+")
                operand1 += operand2;
            else if (lastOperator === "-")
                operand1 -= operand2;
            else if (lastOperator === "×")
                operand1 *= operand2;
            else if (lastOperator === "÷")
                operand1 /= operand2;

            buffer[0] = operand1;
            buffer[1] = value;
            buffer[2] = 0;
        }
    } else {
        if (equation.length === 0) {
            buffer[0] = parseInt(value);
        } else {
            buffer[2] = operand2*10 + parseInt(value);
        }
    }
    updateResult();
}

function resetAll() {
    equation = "";
    buffer = [0, "+", 0];
    resultScreen.innerText = "0";
    equationScreen.innerText = "You can see the arithmetic equation here";
}

function handleBackspace() {
    switch(equation.length) {
        case 1:
        case 2:
            resetAll();
            break;
        default:
            if (!isNaN(equation.charAt(equation.length))) {
                buffer[2] = parseInt(buffer[2]/10);
            }
            updateEquation("back");

    }
}

function handleSymbolClick(value) {
    switch(value) {
        case "C":
            resetAll();
            break;
        case "←":
            if (buffer[1] === "=") {
                resetAll();
                break;
            }
            handleBackspace();
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
        case "=":
            updateBuffer(value);
            break;
    }
}

function handelNumberClick(value) {
    updateBuffer(value);
}

function handleButtonClick(value) {
    if (buffer[1] === "=")
        resetAll();
    if (isNaN(value)) {
        handleSymbolClick(value);
    } else {
        handelNumberClick(value);
    }
    updateEquation(value);
}

function init() {
    document.querySelector(".keypad").addEventListener("click", function(event) {
        handleButtonClick(event.target.innerText);
    });
}

init();