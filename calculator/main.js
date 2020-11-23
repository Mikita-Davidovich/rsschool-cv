const numbers = document.querySelectorAll('.button-number');
const operations = document.querySelectorAll('.button-operation');
const dot = document.getElementById('dot');
const clearBtns = document.querySelectorAll('.button-clear');
const screen = document.getElementById('screen')
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';


for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', (e) => {
    numberPress(e.target.textContent)
  });
}
for (let i = 0; i < operations.length; i++) {
  let operation = operations[i];
  operation.addEventListener('click', (e) => {
    operationPress(e.target.textContent)
  })
}
for (let i = 0; i < clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', (e) => {
    clear(e.srcElement.id)
  });
}
dot.addEventListener('click', (e) => {
  decimal(e.target.textContent)
})

function numberPress(number) {
  if (MemoryNewNumber) {
    screen.value = number;
    MemoryNewNumber = false;
  }
  else{
    if (screen.value === '0') {
      screen.value = number
      }
    else {
      screen.value += number;
    }
  }
}


function operationPress(oper) {
  let localOperationMemory = screen.value;
  if (MemoryNewNumber &&  MemoryPendingOperation !== '='){
    screen.value = MemoryCurrentNumber;
    }
  else{
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+'){
      MemoryCurrentNumber += parseFloat(localOperationMemory);
    }else if (MemoryPendingOperation === '-'){
      MemoryCurrentNumber -= parseFloat(localOperationMemory);
    }else if (MemoryPendingOperation === '*'){
      MemoryCurrentNumber *= parseFloat(localOperationMemory);
    }else if (MemoryPendingOperation === '/'){
      MemoryCurrentNumber /= parseFloat(localOperationMemory);
    }else{
      MemoryCurrentNumber = parseFloat(localOperationMemory);
    }
    screen.value = MemoryCurrentNumber;
    MemoryPendingOperation = oper;
  }
}

 function decimal(argument) {
  let localDecimalMemory = screen.value;
  if (MemoryNewNumber){
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  }else{
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  screen.value = localDecimalMemory;
}

function clear(id) {
  if (id === 'ce') {
    screen.value = '0';
    MemoryNewNumber = true;
  }else if( id === 'c') {
    screen.value = '0';
    MemoryNewNumber = true;
    MemoryPendingOperation = '';
    MemoryCurrentNumber = 0;
  }
}
