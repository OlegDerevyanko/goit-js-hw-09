import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('click', (evt) => {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;

  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  for (let i = 0; i < amountValue; i++) {
    createPromise(i + 1, delayValue + i * stepValue);
  }
})

function createPromise(position, delay) {
  //  console.log(position, delay);
  const shouldResolve = Math.random() > 0.3;
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`)
      }

    }, delay);
  })
  promise
    .then(result => Notify.success(result))
    .catch(result => Notify.failure(result))
}