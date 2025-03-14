import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const refs = {
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  btn: document.querySelector('button'),
  btnCreate: document.querySelector('.form button'),
  form: document.querySelector('.form'),

  options: {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    userSelectedDate: null,
    onClose(selectedDates) {
      refs.options.userSelectedDate = selectedDates[0];

      if (refs.options.userSelectedDate.getTime() > Date.now()) {
        refs.btn.removeAttribute('disabled');
      } else {
        refs.btn.setAttribute('disabled', true);
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future!',
          position: 'topRight',
          color: 'red',
          timeout: 5000,
        });
      }
    },
  },
};

// ✅ Function to convert milliseconds to days, hours, minutes, and seconds
export function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}
