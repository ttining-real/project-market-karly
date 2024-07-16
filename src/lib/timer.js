let counter = document.querySelector('.modal .count');

export default function timerFn() {
  let currentSeconds = 5;

  let timer = setInterval(() => {
    counter.textContent = --currentSeconds;

    if (currentSeconds === 0) {
      clearInterval(timer);
      currentSeconds = 5;
    }
  }, 1000);
}
