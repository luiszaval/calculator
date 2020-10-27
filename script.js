//Math functions
function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
        default:
            break;
    }
}

//DOM elements
const display = document.querySelector('#display');
const numBtns = document.querySelectorAll('.num');
const clearBtn = document.querySelector('#clear')
const enterBtn = document.querySelector('#enter');
const operatorsBtns = document.querySelectorAll('.operator')
const numberBtnArr = [...numBtns];
const opBtnArr = [...operatorsBtns];
const allBtns = document.querySelectorAll('.btn')

//State
let userInput = '';
let firstNum = '';
let operator = '';
let secondNum = ''; 
let result;

//Event Handlers
function handleDisplay() {
    return display.textContent = `${firstNum} ${operator} ${userInput}`
}

function onNumClicked(num) {
    if (result) { // handles if new number pressed after result calculated
        handleClear();
    }
    handleInputChange(num);
}

function handleInputChange(num) {
    userInput += num;
    handleDisplay();
}

function onOpClicked(op){
    if (userInput) {
        firstNum = +userInput;
        userInput = '';
        operator = op;
        handleDisplay()
    } else if (operator && firstNum) { // handles if operator pressed back to back
        operator = op;
        handleDisplay()
    } else { //handles if first thing pressed is operator
        firstNum = 0;
        operator = op;
        handleDisplay()
    }
}

function onEnterClicked(){
    if (firstNum !== '' && operator) {
        secondNum = +userInput;
        result = operate(operator, firstNum, secondNum)
        console.log({ userInput, firstNum, operator, secondNum, result })
        display.textContent = result;
        //handles if operator pressed after result calculated
        userInput = result;
        result = '';
    }
}

function handleClear(){
    userInput = '';
    firstNum = '';
    secondNum = '';
    operator = '';
    result = '';
    display.textContent = 00;
}

const endTransition = (e) => {
    if (e.propertyName !== "transform") return;
    return e.target.classList.remove("clicked");
}


//Event Listeners
numBtns.forEach(btn => btn.addEventListener('click', (e)=>{
    let num = e.target.textContent;
    onNumClicked(num)  
}));

operatorsBtns.forEach(btn => btn.addEventListener('click', (e)=>{
    let op = e.target.textContent
    onOpClicked(op)   
}));
   
enterBtn.addEventListener('click', onEnterClicked)

clearBtn.addEventListener('click',handleClear);

allBtns.forEach(btn => btn.addEventListener('click', ()=>{
    btn.classList.add('clicked')
}))

allBtns.forEach(btn => btn.addEventListener('transitionend', endTransition))



window.addEventListener('keydown', (e)=>{
    let key = e.key;
    let isNum = numberBtnArr.some(btn => btn.textContent == key)
    let isOperator = opBtnArr.some(btn => btn.textContent == key)
    // let isNum = numbers.includes(key);
    // let isOperator = operators.includes(key);
    console.log({key,isNum, isOperator})
    switch (key) {
        case "Enter":
            enterBtn.classList.add('clicked');
            onEnterClicked();
            break;
        case "Backspace":
            clearBtn.classList.add('clicked');
            handleClear();
            break;
        default:
            break;3
    }
    // return isNum ? onNumClicked(key) 
    //         : isOperator ? onOpClicked(key)
    //         : null;
    if(isNum){
        let btn = numberBtnArr.find(btn=>btn.textContent === key)
        btn.classList.add('clicked')
        onNumClicked(key) 
    }else if(isOperator){
        let btn = opBtnArr.find(btn => btn.textContent == key)
        btn.classList.add('clicked')
        onOpClicked(key)
    }
})