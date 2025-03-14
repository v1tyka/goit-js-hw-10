import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './storage';

const makePromise = event => {
  event.preventDefault();

  // Declare selected properly
  const selected = document.querySelector('input[name="state"]:checked');

  // Get the delay value and convert it to a number
  const delay = document.querySelector('[name="delay"]');
  const delayInput = Number(delay.value);

  if (!selected) {
    iziToast.warning({
      title: 'Caution',
      message: 'You forgot important data!',
      position: 'topRight',
      timeout: 5000,
    });
    return;
  }

  // Create and execute the promise
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selected.value === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delayInput}ms`);
      } else {
        reject(`❌ Rejected promise in ${delayInput}ms`);
      }
    }, delayInput);
  })
    .then(message => {
      iziToast.success({
        title: 'Success',
        message,
        position: 'topRight',
        timeout: 555000,
      });
    })
    .catch(message => {
      iziToast.error({
        title: 'Error',
        message,
        position: 'topRight',
        timeout: 5000,
      });
    });
};

// Attach event listener to button
refs.form.addEventListener('submit', makePromise);
