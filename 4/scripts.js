// Obtendo o código PIX da URL
const urlParams = new URLSearchParams(window.location.search);
const pixCode = urlParams.get('code');
document.getElementById('pix-code').innerText = pixCode;

// Função para copiar o código PIX
function copyCode() {
    const codeElement = document.getElementById('pix-code');
    navigator.clipboard.writeText(codeElement.innerText).then(() => {
        document.querySelector('.copy-button').innerHTML = '<i class="fas fa-check"></i> Código copiado!';
    });
}

// Configuração da barra de expiração
const progressBar = document.getElementById('progress-bar');
const timerElement = document.getElementById('timer');
const expirationTime = 15 * 60 * 1000; // 15 minutos em milissegundos
let startTime = new Date().getTime();

function updateProgressBar() {
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - startTime;
    const timeRemaining = expirationTime - timeElapsed;
    const progress = (timeRemaining / expirationTime) * 100;

    progressBar.style.width = `${progress}%`;

    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);

    timerElement.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeRemaining <= 0) {
        progressBar.style.width = '0%';
        timerElement.innerText = '00:00';
        showTimeExpired();
    } else {
        setTimeout(updateProgressBar, 1000);
    }
}

function showTimeExpired() {
    const codeElement = document.getElementById('pix-code');
    codeElement.innerText = 'O código expirou!';
    codeElement.style.color = 'red';
}

updateProgressBar();
