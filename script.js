let playerScore = 0;
let computerScore = 0;
const maxScore = 3; 

// Seleção de elementos do DOM
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const messageDiv = document.getElementById('message');
const choicesDiv = document.getElementById('choices');
const restartBtn = document.getElementById('restart-btn');
const choiceButtons = document.querySelectorAll('.choice');

const opcoes = ['pedra', 'papel', 'tesoura'];

// Inicializa os eventos dos botões
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        const computerChoice = getComputerChoice();
        playRound(playerChoice, computerChoice);
    });
});

restartBtn.addEventListener('click', restartGame);

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * opcoes.length);
    return opcoes[randomIndex];
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        messageDiv.textContent = `Empate! Ambos escolheram ${traduzir(playerChoice)}.`;
    } else if (
        (playerChoice === 'pedra' && computerChoice === 'tesoura') ||
        (playerChoice === 'papel' && computerChoice === 'pedra') ||
        (playerChoice === 'tesoura' && computerChoice === 'papel')
    ) {
        playerScore++;
        playerScoreSpan.textContent = playerScore;
        messageDiv.textContent = `Ponto para você! ${traduzir(playerChoice)} vence ${traduzir(computerChoice)}.`;
    } else {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
        messageDiv.textContent = `Ponto do Computador! ${traduzir(computerChoice)} vence ${traduzir(playerChoice)}.`;
    }

    checkWinner();
}

// Função utilitária para formatar o texto na tela
function traduzir(escolha) {
    return escolha.charAt(0).toUpperCase() + escolha.slice(1);
}

// Controle do estado da partida
function checkWinner() {
    if (playerScore === maxScore || computerScore === maxScore) {
        choicesDiv.classList.add('hidden');
        restartBtn.classList.remove('hidden');

        if (playerScore === maxScore) {
            messageDiv.textContent = "🏆 Vitória! Você ganhou a partida!";
            messageDiv.style.color = "#4CAF50";
        } else {
            messageDiv.textContent = "💀 Derrota! O computador venceu a partida.";
            messageDiv.style.color = "#f44336";
        }
    }
}

// Reinício do jogo
function restartGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    
    messageDiv.textContent = "Faça sua jogada!";
    messageDiv.style.color = "#ffffff";
    
    choicesDiv.classList.remove('hidden');
    restartBtn.classList.add('hidden');
}