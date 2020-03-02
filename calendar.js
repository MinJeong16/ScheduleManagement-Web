const curTitle = document.getElementById('calendar-title'),
calendarBody = document.getElementById('calendar-body');

// VARIABLE SETTING

let today = new Date();
let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
const dayList = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
const ordinaryYear=[31,28,31,30,31,30,31,31,30,31,30,31];
let firstPage = firstDay; 
let pageYear;
if(firstDay.getFullYear() % 4 === 0){
    pageYear = leapYear;
}
else{
    pageYear = ordinaryYear;
}

// FUNCTION
function showCalendar(){
    let monthCnt = 0;
    let cnt = 1;
    for( var i = 0; i < 6; i++){ //4주 & 5주
        var tr = document.createElement('tr');
        tr.setAttribute('id',monthCnt);
        for(var j = 0; j < 7; j++){
            if((i === 0 && j < firstDay.getDay()) ||
            cnt > pageYear[firstDay.getMonth()]){ //이번달의 최대 날짜보다 cnt가 초과된 경우 출력하지 않기 위해
                var td = document.createElement('td');
                tr.appendChild(td);
            }
            else
            {
                var td = document.createElement('td');
                td.textContent = cnt;
                td.setAttribute('id',cnt);
                tr.appendChild(td);
                cnt++;
            }
        }
        monthCnt++;
        calendarBody.appendChild(tr);
    }
    curTitle.innerHTML = monthList[firstDay.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;'+ firstDay.getFullYear();
}

function init(){
    showCalendar();
}

init();