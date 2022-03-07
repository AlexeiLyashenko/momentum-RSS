'use strict'

const timeOutput = document.querySelector('.time'),
      dateOutput = document.querySelector('.date'),
      greeting = document.querySelector('.greeting'),
      hours = new Date().getHours(),
      inputName = document.querySelector('.name');
let timeOut;

function timeGreeting(dateType = 'en-En', 
    greetingFirst = translate.english.greetings.greeting, 
    greetingSecond = translate.english.greetings.day,
    langPlaceholder = translate.english.greetings.placeholder
    ) {

    clearTimeout(timeOut)
    function showTime() {
        const date = new Date(),
              currentTime = date.toLocaleTimeString(); 
              
        timeOutput.textContent = currentTime;
        showDate();
    
        greeting.textContent = `${showGreetings()} ${getTimeOfDayText()}`
    
        timeOut = setTimeout(showTime, 1000)
    }
    
    showTime()
    
    function showDate() {
        const date = new Date(),
              options = { weekday: 'long', month: 'long', day: 'numeric' },
              currentDate = date.toLocaleDateString(dateType, options);
              
        dateOutput.textContent = currentDate;
    }

    function showGreetings(langW = greetingFirst) {
        if (hours >= 6 && hours < 12) {
            return langW[0];
        } else if (hours >= 12 && hours < 18) {
            return langW[1];
        } else if (hours >= 18 && hours < 24) {
            return langW[2];
        } else if (hours >= 0 && hours < 6) {
            return langW[3];
        }
    }
    function getTimeOfDayText(lang = greetingSecond) {
        if (hours >= 6 && hours < 12) {
            return lang[0];
        } else if (hours >= 12 && hours < 18) {
            return lang[1];
        } else if (hours >= 18 && hours < 24) {
            return lang[2];
        } else if (hours >= 0 && hours < 6) {
            return lang[3];
        }
    }
    function getTimeOfDayForBg(dayArr) {
        if (hours >= 6 && hours < 12) {
            return dayArr[0];
        } else if (hours >= 12 && hours < 18) {
            return dayArr[1];
        } else if (hours >= 18 && hours < 24) {
            return dayArr[2];
        } else if (hours >= 0 && hours < 6) {
            return dayArr[3];
        }
    }
    getTimeOfDayVal = getTimeOfDayForBg(translate.english.greetings.day);
    
    function setLocalStorage() {
        localStorage.setItem('name', inputName.value);
    }
    window.addEventListener('beforeunload', setLocalStorage)
      
    function getLocalStorage() {
        if(localStorage.getItem('name')) {
            inputName.value = localStorage.getItem('name');
        }
    }

    inputName.placeholder = langPlaceholder;

    window.addEventListener('load', getLocalStorage)
}

let getTimeOfDayVal;

timeGreeting()