import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputRef = document.querySelector('#datetime-picker');
const btnRef = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

inputRef.addEventListener('click', flatpickr);
btnRef.addEventListener('click', onStartTimer);

let selectedDate = null;
btnRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      btnRef.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnRef.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

function onStartTimer(){
  setInterval(() => {
    const currentDate = new Date();
    const date = selectedDate - currentDate;
    if (date <= 0) {
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
      return;
    }
    if (timerStart) {
      inputRef.disabled = true;
      btnRef.disabled = true;
    }
    const formatedDate = convertMs(date);
    console.log(formatedDate);
    timerStart(formatedDate);
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
function timerStart (date) {
  days.textContent = addLeadingZero(date.days);
  hours.textContent = addLeadingZero(date.hours);
  minutes.textContent = addLeadingZero(date.minutes);
  seconds.textContent = addLeadingZero(date.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
