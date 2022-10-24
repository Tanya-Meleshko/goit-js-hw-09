import Notiflix from 'notiflix';

const delayInput = document.querySelector('input[name="delay"]');
const stepsInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const submitBtn = document.querySelector('button');

submitBtn.addEventListener('click', onSubmitButtonClick);

function onSubmitButtonClick(event) {
  event.preventDefault();
  let delay = Number(delayInput.value);
  const step = Number(stepsInput.value);
  for (let i = 0; i < amountInput.value; i++) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
