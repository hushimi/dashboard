// Global ###########################################
var weeks = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var kanjiweeks = ['日','月','火','水','木','金','土'];
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var enterCnt = 1;
// ##################################################

showcalendar(year, month);
init();
addEvents();

function init() {
  var myHTML = "";
  var box = document.getElementById('time-btn');
  var hour = "";

  for (var i=0; i<24; i++) {

    // 10時より前の時間に0を追加する
    if (i < 10) {
      hour = "0" + i;
    }else {
      hour = i;
    }

    for (var j=0; j < 2; j++) {
      if (j === 0) {
        myHTML += "<li class='timeB'>" + hour + ":00</li>";
      }else {
        myHTML += "<li class='timeB'>" + hour + ":30</li>";
      }
    }
  }
  box.innerHTML = myHTML;
}


function addEvents(){

  document.getElementById('copy-btn').addEventListener('click',copy);
  document.getElementById('reset-btn').addEventListener('click',clear);

  // 時間クリックしたときのイベントを登録
  var timeBtns = document.getElementsByClassName('timeB');
  for(var i=0; i<timeBtns.length; i++) {
    timeBtns[i].addEventListener("click",function(e) {
      var textarea = document.getElementById('mytext');
      var text = textarea.value;
      
      if (enterCnt === 1) {
        text += e.target.innerHTML + "～";
        enterCnt ++;
      } else {
        text += e.target.innerHTML + "  ";
        enterCnt = 1;
      }
      
      textarea.value = text;
    })
  }
}


function copy() {
  var textarea = document.getElementById('mytext');
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  textarea.blur();
}


function clear() {
  var textarea = document.getElementById('mytext');
  textarea.value = "";
}


function showcalendar(year, month) {
  var calendar = document.getElementById('calendar-box');
  calendar.innerHTML = '';
  
  if(month === 13) {
    year++;
    month = 1;
  }
  
  var calendarHtml = createcalendar(year, month);
  var sec = document.createElement('section');
  sec.innerHTML = calendarHtml;
  calendar.appendChild(sec);
  
  // カレンダークリックしたときのイベントを登録
  var btns = document.getElementsByClassName('calendar_td');
  for(var i=0; i<btns.length; i++) {
    btns[i].addEventListener("click",function(e) {
      var textarea = document.getElementById('mytext');
      var text = textarea.value;

      if(text === "") {
        text += e.target.getAttribute("data-date");
        textarea.value = text;
      } else {
        text += '\n' + e.target.getAttribute("data-date");
        textarea.value = text;
      }
      
      enterCnt = 1;
    });
  }
  
  document.getElementById('prev').addEventListener('click',movecalendar);
  document.getElementById('next').addEventListener('click',movecalendar);
  month++;
}


function createcalendar(year, month) {
  var startDate = new Date(year, month-1, 1);
  var endDate = new Date(year, month, 0);
  var endDayCount = endDate.getDate();
  var lastMonthEndDate = new Date(year, month-1, 0);
  var lastMonthDayCount = lastMonthEndDate.getDate();
  var startDay = startDate.getDay();
  var dayCount = 1;
  var calendarHtml = '';


  calendarHtml += '<h1 class="cal-title">' + year + '/' + month + '</h1>';
  calendarHtml += '<div class="button-wrap"><div id="prev" class="button" onclick="movecalendar">←</div>';
  calendarHtml += '<div id="next" class="button" onclick="movecalendar">→</div></div>';
  calendarHtml += '<table class="cal">';

  for (var i=0; i<weeks.length; i++) {
    if(weeks[i] === "Sun") {
      calendarHtml += '<td class="sun">' + weeks[i] + '</td>';
    } else if(weeks[i] === "Sat") {
      calendarHtml += '<td class="sat">' + weeks[i] + '</td>';
    } else {
      calendarHtml += '<td>' + weeks[i] + '</td>';
    }
    
  }

  for(var w=0; w<6; w++) {
    calendarHtml +='<tr>';

    for(var d=0; d<7; d++) {
      var dobj = new Date(year + '/' + month + '/' + dayCount);
      var wDay = dobj.getDay();


      if(w==0 && d<startDay) {
        var num = lastMonthDayCount - startDay + d + 1;
        calendarHtml += '<td class="is-disabled">' + num + '</td>';

      } else if(dayCount > endDayCount) {
        var num = dayCount - endDayCount;
        calendarHtml += '<td class="is-disabled">' + num + '</td>';
        dayCount++;

      } else if(date.getFullYear() == dobj.getFullYear() && date.getMonth() == dobj.getMonth() &&
        date.getDate() == dobj.getDate()) {
        calendarHtml += '<td class="calendar_td today" data-date='; 
        calendarHtml += '"' + month + '月' + dayCount + '日';
        calendarHtml += '(' + kanjiweeks[wDay] + ')">';
        calendarHtml += dayCount + '</td>';

        dayCount++;

      } else if(wDay == 0){
        calendarHtml += '<td class="calendar_td sun" data-date='; 
        calendarHtml += '"' + month + '月' + dayCount + '日';
        calendarHtml += '(' + kanjiweeks[wDay] + ')">';
        calendarHtml += dayCount + '</td>';

        dayCount++;

      } else if(wDay == 6){
        calendarHtml += '<td class="calendar_td sat" data-date='; 
        calendarHtml += '"' + month + '月' + dayCount + '日';
        calendarHtml += '(' + kanjiweeks[wDay] + ')">';
        calendarHtml += dayCount + '</td>';

        dayCount++;

      } else {

        calendarHtml += '<td class="calendar_td" data-date='; 
        calendarHtml += '"' + month + '月' + dayCount + '日';
        calendarHtml += '(' + kanjiweeks[wDay] + ')">';
        calendarHtml += dayCount + '</td>';

        dayCount++;
      }
    }
    calendarHtml += '</tr>';
  }
  calendarHtml+='</table>';
  return calendarHtml;
}


function movecalendar(e) {
  document.getElementById("calendar-box").innerHTML = '';
  if(e.target.id === 'prev') {
    month --;
    if(month < 1) {
      year--;
      month = 12;
    }
  }

  if(e.target.id === 'next') {
    month++;
    if(month>12) {
      year++;
      month = 1;
    }
  }

  showcalendar(year, month);
}

