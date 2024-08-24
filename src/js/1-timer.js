import flatpickr from 'flatpickr'; // Імпорт бібліотеки
import 'flatpickr/dist/flatpickr.min.css'; // Додатковий імпорт стилів
import iziToast from 'izitoast'; // Імпорт бібліотеки iziToast для показу сповіщень та її CSS-стилі.
import 'izitoast/dist/css/iziToast.min.css';
// Знаходимо елементи на сторінці
const startTimerBtn = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const daysCounter = document.querySelector('.value[data-days]');
const hoursCounter = document.querySelector('.value[data-hours]');
const minutesCounter = document.querySelector('.value[data-minutes]');
const secondsCounter = document.querySelector('.value[data-seconds]');

// Вводимо змінну, в яку зберігатимемо обрану дату
let userSelectedDate = 0;

// Налаштування Flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(), //Встановлює поточну дату та час як значення за замовчуванням при відкритті календаря. new Date() створює об'єкт дати та часу, що відповідає поточному моменту.
  minuteIncrement: 1,
  onClose(selectedDates) {
    //функція зворотного виклику (callback), яка викликається кожного разу, коли користувач закриває календар (після вибору дати). selectedDates — це масив, що містить обрані дати. Ми беремо першу дату за допомогою selectedDates[0].
    const dateDifference = selectedDates[0] - Date.now(); //обчислює різницю між обраною датою (selectedDates[0]) і поточним часом (Date.now()). Різниця зберігається в змінній dateDifference.

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

//Якщо різниця дат більше нуля (dateDifference > 0), це означає, що обрана дата знаходиться в майбутньому. У цьому випадку кнопка Start (startTimerBtn) стає активною (disabled = false), і обрана дата зберігається в змінній userSelectedDate.
//Якщо різниця менше або дорівнює нулю, це означає, що обрана дата знаходиться в минулому або відповідає поточному часу. У цьому випадку кнопка Start стає неактивною (disabled = true), і відображається повідомлення про помилку за допомогою бібліотеки iziToast.
flatpickr('#datetime-picker', options);

// Обробник кнопки "Start"
startTimerBtn.addEventListener('click', timerInit);

function timerInit() {
  startTimerBtn.disabled = true;
  dateTimePicker.disabled = true;

  const intervalId = setInterval(() => {
    const dateDifference = userSelectedDate - Date.now();
    //перевірка чи закінчився час таймера
    if (dateDifference <= 0) {
      clearInterval(intervalId); //зупиняємо таймер
      dateTimePicker.disabled = false; //вибір дати стає активним
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
//ф-ія для додавання 0 перед числом таймеру
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