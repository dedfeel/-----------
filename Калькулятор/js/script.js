
const btns = Array.from(document.getElementsByTagName("button"));
const display = document.querySelector(".display");

let currentInput = '';
let previousInput = '';
let operator = '';

btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const value = e.target.textContent;

        if (value === "C") {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.textContent = currentInput;
        } else if (value === "=") {
            display.textContent = calculate(previousInput, operator, currentInput);
        } else if (["+", "/", "-", "x"].includes(value)) {
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        } else if (["+/-", "%", "."].includes(value)) {
            if (value === "+/-") {
                if (currentInput) {
                    currentInput = (parseFloat(currentInput) * -1).toString();
                    display.textContent = currentInput;
                }
            } else if (value === "%") {
                if (currentInput) {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    display.textContent = currentInput;
                }
            } else if (value === ".") {
                if (!currentInput.includes(".")) {
                    currentInput += ".";
                    display.textContent = currentInput;
                }
            }
        } else {
            currentInput += value;
            display.textContent = currentInput;
        }
    });
});

function calculate(num1, op, num2) {
    const a = +num1;
    const b = +num2;

    switch (op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "x":
            return a * b;
        case "/":
            return a / b;
        default:
            return "Error";
    }
}