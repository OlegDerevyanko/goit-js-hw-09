const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let timerId = null;

startButton.addEventListener('click', () => {
    startButton.setAttribute('disabled', true);
    stopButton.removeAttribute('disabled');

    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
});

stopButton.addEventListener('click', () => {
    clearInterval(timerId);
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', true);
});

function getRandomHexColor() {
    return `#${ Math.floor(Math.random() * 16777215).toString(16) }`;
}
