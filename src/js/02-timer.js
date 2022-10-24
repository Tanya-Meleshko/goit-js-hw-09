import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  intervalId: null,
  spanDays: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMins: document.querySelector('span[data-minutes]'),
  spanSecs: document.querySelector('span[data-seconds]'),
  startBtn: document.querySelector('button'),
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - Date.now() < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      options.startBtn.disabled = false;
      options.startBtn.addEventListener('click', () => {
        options.intervalId = setInterval(() => {
          const { days, hours, minutes, seconds } = convertMs(
            selectedDates[0].getTime() - Date.now()
          );
          options.spanDays.textContent = days;
          options.spanHours.textContent = hours;
          options.spanMins.textContent = minutes;
          options.spanSecs.textContent = seconds;
          if (options.spanSecs.textContent === '00') {
            Notiflix.Notify.success('congratulation!!!');
            options.startBtn.disabled = true;
            clearInterval(options.intervalId);
          }
        }, 100);
      });
    }
  },
};

flatpickr('input[type="text"]', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
