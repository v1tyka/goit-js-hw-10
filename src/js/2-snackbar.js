import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './storage';

const makePromise = event => {
  event.preventDefault();

  const selected = refs.form.elements['state'].value;
  const delay = Number(refs.form.elements['delay'].value);

  if (isNaN(delay) || delay < 0) {
    showWarningToast('Please enter a valid non-negative delay time!');
    return;
  }

  if (!selected) {
    showWarningToast('You forgot important data!');
    return;
  }

  createPromise(delay, selected === 'fulfilled')
    .then(showSuccessToast)
    .catch(showErrorToast);
};

const createPromise = (delay, isFulfilled) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isFulfilled ? resolve(delay) : reject(delay);
    }, delay);
  });
};

const showSuccessToast = delay => {
  iziToast.success({
    title: 'Success',
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topRight',
    timeout: 5000,
  });
};

const showErrorToast = delay => {
  iziToast.error({
    title: 'Error',
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'topRight',
    timeout: 5000,
  });
};

const showWarningToast = message => {
  iziToast.warning({
    title: 'Caution',
    message,
    position: 'topRight',
    timeout: 5000,
  });
};

refs.form.addEventListener('submit', makePromise);
