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
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(delay => {
      showMessage('Fulfilled', delay);
    })
    .catch(delay => {
      showMessage('Rejected', delay);
    });
};

promiseForm.addEventListener('submit', handleSubmit);
