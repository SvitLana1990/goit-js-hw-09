import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const container = document.querySelector('.timer');
const field = document.querySelectorAll('.field');
const value = document.querySelectorAll('.value');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysTimer.textContent = addLeadingZero(days);
  hoursTimer.textContent = addLeadingZero(hours);
  minutesTimer.textContent = addLeadingZero(minutes);
  secondsTimer.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

button.addEventListener('click', onButtonClick);

function onButtonClick() {
  const selectedDate = new Date(input.value).getTime();
  const currentDate = Date.now();

  if (selectedDate > currentDate) {
    let differenceTime = selectedDate - currentDate;
    updateTimer(differenceTime);

    const timerInterval = setInterval(() => {
      differenceTime -= 1000;
      if (differenceTime <= 0) {
        clearInterval(timerInterval);
      } else {
        updateTimer(differenceTime);
      }
    }, 1000);
  }
}

input.addEventListener('click', () => {
  flatpickr('#datetime-picker', options);
});

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();

    if (selectedDate <= currentDate) {
      alert('Please choose a date in the future');
    } else {
      button.disabled = false;
    }
  },
};

button.style.backgroundColor = 'green';
button.style.borderRadius = '10px';
container.style.display = 'flex';
container.style.flexDirection = 'row';
container.style.gap = '10px';
field.forEach(item => {
  item.style.display = 'flex';
  item.style.flexDirection = 'column';
});
value.forEach(item => {
  item.style.fontSize = '36px';
  item.style.margin = '0 auto';
  item.style.color = 'red';
});
