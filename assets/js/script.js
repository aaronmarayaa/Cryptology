
function createInputs() 
{
  // Clear previous inputs
  document.getElementById('dynamicInputs').innerHTML = '';

  // Get the number entered by the user
  const num = document.getElementById('numInput').value;

  // Create input boxes and buttons based on the entered number
  for (let i = 0; i < num; i++) {
    const inputBox1 = document.createElement('input');
    inputBox1.type = 'text';
    inputBox1.classList.add('input-box');
    inputBox1.placeholder= "Letter"
    inputBox1.addEventListener('input', decrypt);

    const operator = document.createElement('span');
    operator.textContent = '=';
    operator.classList.add('operator');

    const inputBox2 = document.createElement('input');
    inputBox2.type = 'text';
    inputBox2.placeholder= "Output"
    inputBox2.readOnly = true;
    inputBox2.classList.add('input-result');

    const row = document.createElement('div');
    row.classList.add('row-container');
    row.appendChild(inputBox1);
    row.appendChild(operator);
    row.appendChild(inputBox2);

    document.getElementById('dynamicInputs').appendChild(row);
  }
}

function addInput() 
{
  const inputBox1 = document.createElement('input');
  inputBox1.type = 'text';
  inputBox1.classList.add('input-box');
  inputBox1.placeholder= "Letter"
  inputBox1.addEventListener('input', decrypt);

  const operator = document.createElement('span');
  operator.textContent = '=';
  operator.classList.add('operator');

  const inputBox2 = document.createElement('input');
  inputBox2.type = 'text';
  inputBox2.placeholder= "Output"
  inputBox2.readOnly = true;
  inputBox2.classList.add('input-result');

  const row = document.createElement('div');
  row.classList.add('row-container');
  row.appendChild(inputBox1);
  row.appendChild(operator);
  row.appendChild(inputBox2);

  document.getElementById('dynamicInputs').appendChild(row);
}

function firstTerm() 
{ 
  let firstTerm = document.querySelector("#first-term")
  let firstTermValue = parseInt(firstTerm.value)

  for (var i = 0; i < 26; i++) {
      if ((firstTermValue * i) % 26 === 1) {
          return i;
      }
  }
  return null; 
}

function secondTerm() 
{
  let inputTerm = document.getElementById('second-term');
  let transformedValue = 0
  let userInput = parseFloat(inputTerm.value)
  
  if(isNaN(userInput)) {
    return letterValue();
  } else if (!isNaN(userInput)) {
    transformedValue = userInput > 0 ? letterValue() - userInput : letterValue() + Math.abs(userInput);
  } else {
    console.error('Input is not a number');
  }

  return transformedValue;
}

function letterValue() 
{ 
  const rows = document.querySelectorAll('.row-container');
  let letterIndex = 0

    rows.forEach(row => {
      const inputBox1 = row.querySelector('.input-box');
      const inputBox2 = row.querySelector('.input-result');

      const inputBox1Value = inputBox1.value.toUpperCase();

      if (/^[A-Z]$/.test(inputBox1Value)) {
        letterIndex = inputBox1Value.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
      } else {
        inputBox2.value = '';
      }
    });
    
    return letterIndex;
}

function decrypt(event) {
  let a = firstTerm() * secondTerm()
  let b = modulo(a, 26)
  const rows = document.querySelectorAll('.row-container');
  let resultLetter = ""

  rows.forEach(() => {

    const inputBox1Value = b;

    if (/^\d+$/.test(inputBox1Value)) {
        let letterIndex = 0

        if(parseInt(inputBox1Value) != 0){
          letterIndex = parseInt(inputBox1Value);
        } else {
          letterIndex = 0
        }

        resultLetter = String.fromCharCode('A'.charCodeAt(0) - 1 + letterIndex);

        if(letterIndex == 0) {
          resultLetter = "Z"
        }

        const resultInputBox = event.target.nextElementSibling.nextElementSibling;
        resultInputBox.value = resultLetter;
      } else {
        event.target.nextElementSibling.nextElementSibling.value = '';
      }
  });
}

function modulo(a, mod) {
  if(a < 0 ){
    while(a < 0) {
      a += mod
    }
    return a
  } else if(a > mod) {
    return a % mod
  } else if(a > 0 && a < mod){
    return a
  } else {
    return 0
  }
}