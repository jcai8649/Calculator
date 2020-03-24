const buttons = document.querySelectorAll('.calc-button');
const screen = document.querySelector('.screen');
let operator = '';
let answer = '';
let backlog = '';

function operate(operator, a, b){
    if(operator == '+'){
      return add(a, b);
    } else if(operator == '-'){
      return subtract(a, b);
    } else if(operator == '×'){
      return multiply(a, b);
    } else if(operator == '÷'){
      return divide(a, b);
    }
}

function add(a, b){
    return a + b;
}
  
function subtract(a, b){
    return a - b;
}
  
function multiply(a, b) {
    return a * b;
}
  
function divide(a, b){
    if(b == 0){ 
      clear();
      return screen.textContent = 'NaN';
    } else {
      return a / b;
    }
}
  
function update(input){
    return screen.textContent = input;
}
  
function clear(){
    answer = '';
    operator = '';
    backlog = '';
    screen.textContent = '0';
}
  
function numSelect(num){
    if(operator == ''){ 
      answer += num;
      screen.textContent = answer;
    } else{ 
      backlog += num;
      screen.textContent = backlog;
    }
}
  

  
function equals(){
    if(!operator){
      return;
    } else {
      answer = operate(operator, Number(answer), Number(backlog));
      update(answer);
      backlog = '';
    }
}
  
function plusMinus(){
    if(backlog != ''){ 
      backlog *= -1;
      update(backlog);
    } else {
      answer *= -1;
      update(answer);
    }
}
  
function del(){
    if(backlog != ''){ 
      backlog = backlog.toString().slice(0, backlog.length - 1);
      if(backlog == ''){ 
        update(answer);
      } else { 
        update(backlog);
      }
    } else { 
      answer = answer.toString();
      answer = answer.slice(0, answer.length - 1);
      if(answer == ''){ 
        clear();
      } else { 
        update(answer);
      }
    }
}
  
function decimal(current){
    if(backlog != ''){ 
      backlog = backlog.toString();
      if(backlog.includes('.')){ 
        current = '';
      }
    } else { 
      answer = answer.toString();
      if(answer.includes('.')){ 
        current = '';
      }
    }
      numSelect(current); 
}
  


buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    let current = button.textContent;

    switch (current) {
        case 'AC':
            clear();
            break;
        case '←':
            del();
            break;
        case '.':
            decimal(current);
            break;
        case '=':
            equals();
            break;
        case '+/-':
            plusMinus();
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            if(backlog == ''){
                  operator = current;
                } else {
                    if(!answer){
                      if(!operator && !backlog){
                        answer = screen.textContent;
                      }
                    }
                    answer = operate(operator, Number(answer), Number(backlog));
          
                    if (!answer){
                      clear();
                    } else {
                      update(answer);
                      operator = current;
                      backlog = '';
                    }
                }
                break;
            default:
                if(isNaN(answer)){ 
                    answer = '';
                  }
                  numSelect(current);
                  break;
    }
  })
})


