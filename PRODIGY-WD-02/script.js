// script.js
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = {
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    milliseconds: document.getElementById('milliseconds'),
};

const lapList = document.getElementById('lapList');

function updateDisplay(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    display.hours.textContent = String(hours).padStart(2, '0');
    display.minutes.textContent = String(minutes).padStart(2, '0');
    display.seconds.textContent = String(seconds).padStart(2, '0');
    display.milliseconds.textContent = String(milliseconds).padStart(2, '0');
}

function startTimer() {
    if (isRunning) return;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime);
    }, 10);
    isRunning = true;
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay(elapsedTime);
}

function addLap() {
    if (!isRunning) return;
    const lapTime = document.createElement('li');
    lapTime.textContent = display.hours.textContent + ':' + display.minutes.textContent + ':' + display.seconds.textContent + ':' + display.milliseconds.textContent;
    lapList.appendChild(lapTime);
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', addLap);
