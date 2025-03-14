import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { refs, convertMs } from './storage';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

flatpickr(refs.input, refs.options);

let countdownInterval;

refs.btn.setAttribute('disabled', true);

refs.btn.addEventListener('click', () => {
  const selectedDate = refs.options.userSelectedDate;

  if (!selectedDate || selectedDate.getTime() <= Date.now()) {
    refs.btn.setAttribute('disabled', true);
    return;
  }

  refs.btn.setAttribute('disabled', true);
  refs.input.setAttribute('disabled', true);
  refs.btn.style.pointerEvents = 'none';

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const ms = selectedDate - now;

    if (ms <= 0) {
      clearInterval(countdownInterval);
      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.minutes.textContent = '00';
      refs.seconds.textContent = '00';

      refs.input.removeAttribute('disabled');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(ms);

    refs.days.textContent = String(days).padStart(2, '0');
    refs.hours.textContent = String(hours).padStart(2, '0');
    refs.minutes.textContent = String(minutes).padStart(2, '0');
    refs.seconds.textContent = String(seconds).padStart(2, '0');
  }, 1000);
});
