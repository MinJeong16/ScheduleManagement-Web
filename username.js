const form = document.querySelector('.js-user-form'),
input = form.querySelector('input'),
name = document.querySelector('.js-user');

const USER = 'currentUser',
SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER,text);
}

function paintName(text){
    form.classList.remove(SHOWING_CN);
    name.classList.add(SHOWING_CN);
    name.innerText = `Have a nice day, ${text}!`;
}

function handleSubmit(event){
    event.preventDefault(); 
    const curVal = input.value;
    paintName(curVal);
    saveName(curVal);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit',handleSubmit);
}

function loadName(){
    const curUser = localStorage.getItem(USER);
    if(curUser === null){
        askForName();
    }else{
        paintName(curUser);
    }
}

function init(){
    loadName();
}

init();