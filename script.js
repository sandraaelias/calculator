const input = document.getElementById("inputBox");
const buttons = document.querySelectorAll("button");
const operators = ["+", "-", "*", "/", "%"];
let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "AC") {
      expression = "";
    } else if (value === "DEL") {
      expression = expression.slice(0, -1);
    } else if (value === "=") {
      try {
        const result = calculate(expression);
        expression = Number.isFinite(result) ? String(result) : "Error";
      } catch {
        expression = "Error";
      }
    } else if (operators.includes(value)) {
      if (expression === "" || operators.includes(expression.slice(-1))) return;
      expression += value;
    } else {
      expression += value;
    }

    input.value = expression;
  });
});

function calculate(expression) {
  let numbers = [];
  let ops = [];
  let num = "";

  for (let i = 0; i < expression.length; i++) {
    let ch = expression[i];

    if (!isNaN(ch) || ch === ".") {
      num += ch;
    } else {
      numbers.push(parseFloat(num));
      ops.push(ch);
      num = "";
    }
  }

  numbers.push(parseFloat(num));

  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "*" || ops[i] === "/" || ops[i] === "%") {
      let result;
      if (ops[i] === "*") result = numbers[i] * numbers[i + 1];
      else if (ops[i] === "/") result = numbers[i] / numbers[i + 1];
      else result = numbers[i] % numbers[i + 1];

      numbers[i] = result;
      numbers.splice(i + 1, 1);
      ops.splice(i, 1);
      i--;
    }
  }

  let result = numbers[0];

  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "+") result += numbers[i + 1];
    else if (ops[i] === "-") result -= numbers[i + 1];
  }

  return result;
}
