const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

btnStart.addEventListener('click', onChangeColor);
btnStop.addEventListener('click', offChangeColor);
let timerId = null;
btnStop.disabled = true;

function onChangeColor() {
    if(timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000)) {
    btnStart.disabled = true;
    btnStop.disabled = false;
  }
  console.log(`Interval with id ${timerId} has start!`);
};

function offChangeColor() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
