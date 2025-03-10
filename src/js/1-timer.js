import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= this.now) {
      error_handler();
      button.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      button.disabled = false;
      button.addEventListener('click', start_button_handler);
    }
  },
};

const date_input = document.getElementById('datetime-picker');
const button = document.querySelector('button');

flatpickr(date_input, options);

function start_button_handler() {
  button.disabled = true;
  date_input.disabled = true;
  const intervalID = setInterval(() => {
    const currentTime = new Date().getTime();
    const remainingMs = userSelectedDate.getTime() - currentTime;
    const timer_data = convertMs(remainingMs);
    if (remainingMs < 1000) {
      clearInterval(intervalID);
      button.disabled = false;
      date_input.value = '';
      if (!date_input.value) {
        button.disabled = true;
      }
      date_input.disabled = false;
    }
    document.querySelector('[data-days]').textContent = addLeadingZero(
      timer_data.days
    );
    document.querySelector('[data-hours]').textContent = addLeadingZero(
      timer_data.hours
    );
    document.querySelector('[data-minutes]').textContent = addLeadingZero(
      timer_data.minutes
    );
    document.querySelector('[data-seconds]').textContent = addLeadingZero(
      timer_data.seconds
    );
  }, 1000);
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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function error_handler() {
  iziToast.show({
    title: 'Error:',
    message: 'Please choose a date in the future!',
    backgroundColor: 'red',
    titleColor: 'white',
    messageColor: 'white',
    position: 'topRight',
  });
}
