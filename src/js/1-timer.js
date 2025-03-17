import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { refs, convertMs } from './storage';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let selectedDate = null;
let countdownInterval = null;

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    selectedDate = selectedDates[0];

    if (!selectedDate || selectedDate.getTime() <= Date.now()) {
      iziToast.error({
        title: 'Помилка!',
        message: 'Будь ласка, виберіть дату в майбутньому.',
        position: 'topRight',
      });
      refs.btn.setAttribute('disabled', true);
    } else {
      refs.btn.removeAttribute('disabled');
    }
  },
});

refs.btn.setAttribute('disabled', true);

refs.btn.addEventListener('click', () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  refs.btn.setAttribute('disabled', true);
  refs.input.setAttribute('disabled', true);
  refs.btn.style.pointerEvents = 'none';

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const ms = selectedDate - now;

    if (ms <= 0) {
      clearInterval(countdownInterval);
      refs.days.textContent =
        refs.hours.textContent =
        refs.minutes.textContent =
        refs.seconds.textContent =
          '00';
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
