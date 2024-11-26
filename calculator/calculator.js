const result = document.getElementById('result');

const equal = document.getElementById('equal');

// Operations
const operations = document.querySelectorAll('.operation:not(#ce)');

// Items
const items = document.querySelectorAll('.num:not(.equal)');

let resultShown = false;

// Events
equal.addEventListener('click', () => {
  calculate();
  makeACButton();
});

operations.forEach(operation => {
  operation.addEventListener('click', event => {
    addOperationToEquation(event.target.innerText.replace('x', '*'));
  });
});

items.forEach(item => {
  item.addEventListener('click', event => {
    addItemToEquation(event.target.innerText);
  });
});

document.getElementById('ce').addEventListener('click', clearEntry);

// Functions
function calculate() {
  let result;
  
  try {
    result = eval(getEquation());
  } catch (e) {
    window.result.value = 'Please give the valid input';
    
    window.resultShown = true;
    
    return false;
  }
  
  window.result.value += ' = ' + result;
  
  window.resultShown = true;
}

function getEquation() {
  return window.result.value.replace(/[^0-9\*\/\-\+.]/g, '');
}

function addItemToEquation(item) {
  if (!window.resultShown) {
    window.result.value += item;
  } else {
    window.result.value = item;
    window.resultShown = false;
  }
}

function addOperationToEquation(operation) {
  if (!window.resultShown) {
    window.result.value += operation;
  } else {
    window.result.value = operation;
    window.resultShown = false;
  }
}

function makeACButton() {
  let button = document.getElementById('ce');
  
  button.removeEventListener('click', clearEntry);
  button.innerText = 'AC';
  button.setAttribute('id', 'ac');
  document.getElementById('ac').addEventListener('click', clearResult);
}

function clearResult() {
  window.result.value = '';
  window.resultShown = false;
  
  makeCEButton();
}

function makeCEButton() {
  let button = document.getElementById('ac');
  
  button.removeEventListener('click', clearResult);
  button.innerText = 'CE';
  button.setAttribute('id', 'ce');
  document.getElementById('ce').addEventListener('click', clearEntry);
}

function clearEntry() {
  window.result.value = window.result.value.slice(0, -1);
}