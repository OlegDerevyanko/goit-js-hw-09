import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const inputId = document.getElementById('datetime-picker');
const timerContainer = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');
startBtn.style.fontSize = 'x-large'
startBtn.disabled = true;

const daySpan = document.querySelector('[data-days]');
const hourSpan = document.querySelector('[data-hours]');
const minuteSpan = document.querySelector('[data-minutes]');
const secondSpan = document.querySelector('[data-seconds]');

let selectDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        selectDate = selectedDates[0].getTime();

        if (selectDate < Date.now()) {
            Notify.failure("Please choose a date in the future", { position: "center-top", fontSize: '20px', width: '400px' });
            return;
        } else {
            startBtn.disabled = false;
            Notify.success('Success', { timeout: 1500, position: "center-top", fontSize: '25px' });
        }
        startBtn.addEventListener('click', startCount);
    },
};

let fp = flatpickr(inputId, options);

function startCount() {
    startBtn.disabled = true;

    let timer = setInterval(() => {
        const currentDate = Date.now();
        const selectDateAndCurrentDate = selectDate - currentDate;

        if (selectDateAndCurrentDate >= 0) {
            const convertToObject = convertMs(selectDateAndCurrentDate);
            const { days, hours, minutes, seconds } = convertToObject;

            daySpan.textContent = days
            hourSpan.textContent = hours;
            minuteSpan.textContent = minutes;
            secondSpan.textContent = seconds;
            if (selectDateAndCurrentDate <= 86400000) {
                timerContainer.style.color = 'red';
            }
        } else {
            clearInterval(timer);
            timerContainer.style.color = 'black';
        }
    }, 1000);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}