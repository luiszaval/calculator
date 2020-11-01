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
const clearBtn = document.querySelector('#clear')
const enterBtn = document.querySelector('#enter');
const backspaceBtn = document.querySelector('#backspace')
const numBtns = document.querySelectorAll('.num');
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
    if(num === "."){
        return !userInput.includes(num) ? handleInputChange(num) : null
    }
    handleInputChange(num);
}

function handleInputChange(num) {
    userInput += num;
    handleDisplay();
}

function onOpClicked(op) {
    if(firstNum === '' && !userInput && result === ''){//first thing pressed is operator
        firstNum = 0;
        operator = op;
        handleDisplay()
    }else if(userInput && firstNum === ''){ // num pressed then operator
        firstNum = +userInput;
        userInput = '';
        result = '';
        operator = op;
        handleDisplay()
    }else if(userInput && firstNum !== ''){//num pressed then operator then num then operator
        secondNum = +userInput;
        result = parseFloat(operate(operator, firstNum, secondNum).toFixed(2));
        display.textContent = `${result} ${op}`
        operator = op;
        firstNum = result;
        secondNum = '';
        userInput = '';
    } else if (!userInput && firstNum !=='' && result === '') {
        operator = op;
        handleDisplay();
    }else if(result !== '' && !userInput && firstNum === ''){ // already calculated and operator is pressed
        firstNum = result;
        result = '';
        operator = op;
        handleDisplay();
    }
}

function onEnterClicked(){
    if (firstNum !== '' && operator && userInput ) {
        secondNum = +userInput;
        result = parseFloat(operate(operator, firstNum, secondNum).toFixed(2));
        display.textContent = result;
        userInput = '';
        secondNum =''; 
        firstNum  = '';
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

function handleBackspace(){
    if(firstNum !== '' && operator && userInput){ //if firstNum and operator are saved delete userInput
        userInput = userInput.slice(0,-1);
        handleDisplay();
    }else if(firstNum !== '' && operator){ //once userInput has been deleted delete operator
        operator  = '';
        handleDisplay()
    }else if(firstNum !== ''){ // once operator has been deleted delete firstNum
        firstNumStr  = firstNum.toString().slice(0,-1);
        if(firstNumStr){ //check to see if firstNum still exists
            firstNum = +(firstNum.toString().slice(0, -1)); //if firstNum still exists update result
            handleDisplay();
        }else{
            handleClear(); //if fisrtNum is completely deleted then clear all data
        }
    }else{
        handleClear();
    }
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

backspaceBtn.addEventListener('click', handleBackspace)

allBtns.forEach(btn => btn.addEventListener('click', ()=>{
    btn.classList.add('clicked')
}))

allBtns.forEach(btn => btn.addEventListener('transitionend', endTransition))



window.addEventListener('keydown', (e)=>{
    console.log({ userInput, firstNum, operator, secondNum, result })
    let key = e.key;
    let isNum = numberBtnArr.some(btn => btn.textContent == key)
    let isOperator = opBtnArr.some(btn => btn.textContent == key)
    if(isNum){
        let btn = numberBtnArr.find(btn=>btn.textContent === key)
        btn.classList.add('clicked')
        onNumClicked(key) 
    }else if(isOperator){
        let btn = opBtnArr.find(btn => btn.textContent == key)
        btn.classList.add('clicked')
        onOpClicked(key)
    }else if( key === 'Enter'){
        enterBtn.classList.add('clicked');
        onEnterClicked();
    }else if(key === 'Backspace'){
        backspaceBtn.classList.add('clicked');
        handleBackspace();
    }
})

window.addEventListener('click', ()=>{
    console.log({ userInput, firstNum, operator, secondNum, result })
})


/*
* NEED TO DO
    * on enter pressed display calculation up top and result in the bottom
    * on operation in progress display result up top and operation bottom
    * show result top left
    * operand top right
    * current value in the middle
    * 
    * style it up
    * add style themes
*/