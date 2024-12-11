let timeLeft;
let timerInterval;

// Referências para os elementos da página
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const circleProgress = document.querySelector('.circle-progress');
const startButton = document.getElementById('startButton');

// Referências para os campos de entrada
const inputHours = document.getElementById('input-hours');
const inputMinutes = document.getElementById('input-minutes');
const inputSeconds = document.getElementById('input-seconds');

// Função para calcular o tempo em segundos a partir dos campos de entrada
function getTimeInSeconds() {
    const hours = parseInt(inputHours.value) || 0;
    const minutes = parseInt(inputMinutes.value) || 0;
    const seconds = parseInt(inputSeconds.value) || 0;
    
    return (hours * 3600) + (minutes * 60) + seconds;
}

// Função para atualizar o temporizador
function updateTimer() {
    let hours = Math.floor(timeLeft / 3600);
    let minutes = Math.floor((timeLeft % 3600) / 60);
    let seconds = timeLeft % 60;

    // Atualizando a interface com o tempo restante
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');

    // Atualizando a barra de progresso
    const progress = (timeLeft / getTimeInSeconds()) * 100;
    circleProgress.style.strokeDashoffset = 100 - progress;

    // Decrementando o tempo
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(timerInterval);  // Para o temporizador quando o tempo chega a 0
        startButton.disabled = false;  // Habilita o botão novamente para reiniciar
    }
}

// Função para iniciar o temporizador
function startTimer() {
    timeLeft = getTimeInSeconds(); // Configura o tempo inicial com base nas entradas
    if (timeLeft > 0) {
        startButton.disabled = true;  // Desabilita o botão para evitar múltiplos cliques
        timerInterval = setInterval(updateTimer, 1000);  // Inicia o intervalo para atualizar o tempo
    }
}

// Evento de clique para iniciar o temporizador
startButton.addEventListener('click', startTimer);
