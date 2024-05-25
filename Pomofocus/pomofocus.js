const buttons = document.querySelectorAll("nav button");

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    cleanButtonsAttribute();
    const button = e.target;
    button.setAttribute('active', 'true');

    const id = button.getAttribute('id');
    changeTheme(id);
    changeTitle(id);

    timerCountInSeconds = timerType[id];
    renderTimerDisplay();
  });
});

function cleanButtonsAttribute() {
  buttons.forEach(button => {
    button.setAttribute('active', 'false');
  });
}

const root = document.documentElement;
const colors = {
  'pomodoro': 'rgb(217, 85, 80)',
  'pausa-curta': 'rgb(76, 145, 149)',
  'pausa-longa': 'rgb(64, 124, 163)'
};

function changeTheme(id) {
  const color = colors[id];
  root.style.setProperty('--main-color', color);
}

const timerType = {
  'pomodoro': 25 * 60,
  'pausa-curta': 5 * 60,
  'pausa-longa': 15 * 60
};

function changeTitle(id) {
  const titles = {
    'pomodoro': 'Pomodoro',
    'pausa-curta': 'Pausa Curta',
    'pausa-longa': 'Pausa Longa'
  };
  document.title = titles[id];
}

const actionButton = document.querySelector('button.action-button');
let isTimerStopped = false;
let intervalId; 

actionButton.addEventListener('click', () => {
  isTimerStopped = !isTimerStopped;
  handleTimer(isTimerStopped);
  if (isTimerStopped) {
    clearInterval(intervalId);
  } else {
    startTimer();
  }
});

function handleTimer(isTimerStopped) {
  actionButton.classList.toggle('stop', isTimerStopped);
  if (isTimerStopped) {
    actionButton.innerText = 'INICIAR';
  } else {
    actionButton.innerText = 'STOP';
  }
}

// Contador

const timerDisplay = document.querySelector('h1');
let timerCountInSeconds;

function renderTimerDisplay() {
  const minutes = Math.floor(timerCountInSeconds / 60);
  const seconds = timerCountInSeconds % 60;

  const minuteString = String(minutes).padStart(2, '0');
  const secondString = String(seconds).padStart(2, '0');

  timerDisplay.innerText = `${minuteString}:${secondString}`;
}

function startTimer() {
  intervalId = setInterval(() => {
    if (timerCountInSeconds > 0) {
      timerCountInSeconds--;
      renderTimerDisplay();
    } else {
      clearInterval(intervalId);
      alert('Tempo concluído!');
    }
  }, 1000);
}

// Inicializa o temporizador com um valor padrão
timerCountInSeconds = timerType['pomodoro'];
renderTimerDisplay();
