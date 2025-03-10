import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElement = document.querySelector('.form');
formElement.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const formObject = Object.fromEntries(formData.entries());

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formObject.state === 'fulfilled') {
        const resolveStr = `✅ Fulfilled promise in ${formObject.delay}ms`;
        resolve(resolveStr);
        showError(resolveStr, 'green');
      } else {
        const rejectStr = `❌ Rejected promise in ${formObject.delay}ms`;
        reject(rejectStr);
        showError(rejectStr, '#FF5B61');
      }
    }, formObject.delay);
  });
});

function showError(message_data, backgroundColor) {
  iziToast.show({
    title: '',
    message: message_data,
    backgroundColor: backgroundColor,
    titleColor: 'white',
    messageColor: 'white',
    position: 'topRight',
  });
}
