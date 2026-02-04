var display = document.getElementById("display");
var historyList = document.getElementById("historyList");

// Recuperar historial del LocalStorage al iniciar
var calcHistory = JSON.parse(localStorage.getItem("robertCalcData")) || [];
renderHistory();

function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    var input = display.value;
    if (input === "") return;

    var operator = "";
    var result = 0;

    // 1. Detectar qué operación queremos hacer
    if (input.includes('+')) operator = '+';
    else if (input.includes('-')) operator = '-';
    else if (input.includes('x')) operator = 'x';
    else if (input.includes('/')) operator = '/';

    if (operator === "") return;

    // 2. Separar los números (split)
    var parts = input.split(operator);
    if (parts.length < 2 || parts[1] === "") return;

    var n1 = parseFloat(parts[0]);
    var n2 = parseFloat(parts[1]);

    // 3. Lógica manual sin usar eval()
    switch (operator) {
        case '+': result = n1 + n2; break;
        case '-': result = n1 - n2; break;
        case 'x': result = n1 * n2; break;
        case '/': 
            result = n2 !== 0 ? n1 / n2 : "Error"; 
            break;
        default: return;
    }

    // 4. Mostrar resultado y guardar en LocalStorage
    display.value = result;
    if (result !== "Error") {
        addToHistory(input + " = " + result);
    }
}

function addToHistory(operation) {
    calcHistory.push(operation);
    localStorage.setItem("robertCalcData", JSON.stringify(calcHistory));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";
    calcHistory.forEach(function(item) {
        var li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    calcHistory = [];
    localStorage.removeItem("robertCalcData");
    renderHistory();
}