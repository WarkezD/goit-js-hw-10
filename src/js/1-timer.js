import flatpickr from 'flatpickr'; 
import 'flatpickr/dist/flatpickr.min.css'; 
import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css';
// Знаходимо елементи на сторінці
const startTimerBtn = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const daysCounter = document.querySelector('.value[data-days]');
const hoursCounter = document.querySelector('.value[data-hours]');
const minutesCounter = document.querySelector('.value[data-minutes]');
const secondsCounter = document.querySelector('.value[data-seconds]');

let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateDifference = selectedDates[0] - Date.now();

    if (dateDifference > 0) {
      startTimerBtn.disabled = false;
      userSelectedDate = selectedDates[0];
    } else {
      startTimerBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        theme: 'dark',
        closeOnEscape: true,
      });
    }
  },
};

flatpickr('#datetime-picker', options);

startTimerBtn.addEventListener('click', timerInit);

function timerInit() {
  startTimerBtn.disabled = true;
  dateTimePicker.disabled = true;

  const intervalId = setInterval(() => {
    const dateDifference = userSelectedDate - Date.now();
    if (dateDifference <= 0) {
      clearInterval(intervalId); 
      dateTimePicker.disabled = false;
      iziToast.info({
        title: 'Notification',
        message: 'The timer has expired',
        position: 'topRight',
        theme: 'dark',
        closeOnEscape: true,
      });
      return;
    }

    const timerValues = convertMs(dateDifference);

    secondsCounter.textContent = addLeadingZero(timerValues.seconds);
    minutesCounter.textContent = addLeadingZero(timerValues.minutes);
    hoursCounter.textContent = addLeadingZero(timerValues.hours);
    daysCounter.textContent = addLeadingZero(timerValues.days);
  }, 1000);
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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