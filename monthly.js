const monthlyForm = document.querySelector('.monthly-input-form'),
monthlyInput = monthlyForm.querySelector('input');
monthlyList = document.querySelector('.monthly--shown'); 

const MONTHLY_LS = 'plans';
let plans = [];

function deletePlans(event){
    const btn = event.target;
    const div = btn.parentNode;
    monthlyList.removeChild(div);
    const cleanPlans = plans.filter(function(plan){
        return plan.id !== parseInt(div.id); //Cause plan.id is integer but div.id is string.
    });
    plans = cleanPlans;
    savePlans();
}

function savePlans(){
    localStorage.setItem(MONTHLY_LS,JSON.stringify(plans));
}

function paintPlans(text){
    const li = document.createElement("li"); //Create li element on html.
    const delBtn = document.createElement("button"); //Create delete button.
    delBtn.innerHTML = "X"; //Place 'X' on the button.
    delBtn.className ="btn";
    delBtn.addEventListener('click',deletePlans); //If user click the delBtn, then execute the function named deleteplans.
    const div = document.createElement("div");
    const newId = plans.length+ 1;
    div.innerText = text; 
    li.appendChild(div);
    li.appendChild(delBtn);
    li.id = newId;
    monthlyList.appendChild(li);
    const planObj = {
        text: text,
        id : newId
    };
    plans.push(planObj);
    savePlans();
}

function handleSubmit(){
    event.preventDefault();
    const curVal = monthlyInput.value;
    paintPlans(curVal);
    monthlyInput.value = "";
}

function loadPlans(){
    const loadedPlan = localStorage.getItem(MONTHLY_LS);
    if(loadedPlan !== null){
        const parsedPlans = JSON.parse(loadedPlan);
        parsedPlans.forEach(function(plan){
            paintPlans(plan.text);
        })
    }
}

function init(){
    loadPlans();
    monthlyForm.addEventListener('submit',handleSubmit);
}

init();