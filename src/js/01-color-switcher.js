const startButton = document.querySelector('[data-start]');
const stoptButton = document.querySelector('[data-stop]');
let timerId = null;

stoptButton.disabled = true;
startButton.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stoptButton.disabled = false;
});

stoptButton.addEventListener('click', () => {
  clearInterval(timerId);
  startButton.disabled = false;
  stoptButton.disabled = true;
});
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
