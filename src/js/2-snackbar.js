import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const showMessage = (status, message) => {
  iziToast.show({
    title: status,
    timeout: 5000,
    position: 'center',
    message: message,
    color: status == 'Fulfilled' ? 'green' : 'red',
  });
};

const promiseForm = document.querySelector('.form');

const handleSubmit = event => {
  event.preventDefault();
  const radioButtons = event.target.querySelectorAll('input[name="state"]');
  let state;
  radioButtons.forEach(radio => {
    if (radio.checked) {
      state = radio.value;
    }
  });
  const delay = parseInt(event.target.elements.delay.value);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      showMessage('Fulfilled', `✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => {
      showMessage('Rejected', `❌ Rejected promise in ${delay}ms`);
    });
};

promiseForm.addEventListener('submit', handleSubmit);
