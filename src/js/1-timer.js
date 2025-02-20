import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  dateForm: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let userDate = null;

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!selectedDates[0] || selectedDates[0] <= options.defaultDate) {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future!',
        position: 'topRight',
        titleColor: 'white',
        messageColor: 'white',
        backgroundColor: 'red',
      });
      refs.btnStart.disabled = true;
      return;
    }
    refs.btnStart.disabled = false;
    userDate = selectedDates[0];
  },
};

const getConvertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const setTimeToHTML = differenceDate => {
  const { days, hours, minutes, seconds } = getConvertMs(differenceDate);
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
};

const onStartTimer = () => {
  refs.btnStart.disabled = true;
  refs.dateForm.disabled = true;
  timerId = setInterval(() => {
    const differenceDate = userDate - new Date();
    if (differenceDate <= 0) {
      clearInterval(timerId);
      refs.dateForm.disabled = false;
      return;
    }

    setTimeToHTML(differenceDate);
  }, 1000);

  iziToast.show({
    title: 'Info',
    message: 'The countdown has started!',
    position: 'topRight',
    titleColor: 'white',
    messageColor: 'white',
    backgroundColor: 'blue',
  });
};

flatpickr(refs.dateForm, options);
refs.btnStart.addEventListener('click', onStartTimer);
