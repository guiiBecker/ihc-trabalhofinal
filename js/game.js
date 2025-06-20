// Estado do jogo
let gameState = {
    currentQuestion: 0,
    score: 0,
    totalQuestions: 10,
    timeLeft: 30,
    timer: null,
    difficulty: 'easy',
    correctAnswers: 0,
    gameStartTime: null,
    helpUsed: 3,
    isPaused: false
};

// Base de dados de questões
const questionsDatabase = {
    easy: [
        {
            question: "Qual é a capital do Brasil?",
            options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
            correct: 1
        },
        {
            question: "Quantos continentes existem no mundo?",
            options: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "Qual é o maior planeta do sistema solar?",
            options: ["Terra", "Marte", "Saturno", "Júpiter"],
            correct: 3
        },
        {
            question: "Quem escreveu 'O Cortiço'?",
            options: ["Machado de Assis", "Aluísio Azevedo", "José de Alencar", "Clarice Lispector"],
            correct: 1
        },
        {
            question: "Qual é o resultado de 8 × 7?",
            options: ["54", "56", "58", "62"],
            correct: 1
        },
        {
            question: "Em que ano o Brasil foi descoberto?",
            options: ["1498", "1500", "1502", "1504"],
            correct: 1
        },
        {
            question: "Qual é a fórmula da água?",
            options: ["CO2", "H2O", "O2", "H2SO4"],
            correct: 1
        },
        {
            question: "Quantos estados tem o Brasil?",
            options: ["25", "26", "27", "28"],
            correct: 1
        },
        {
            question: "Qual é a língua oficial do Brasil?",
            options: ["Espanhol", "Inglês", "Português", "Francês"],
            correct: 2
        },
        {
            question: "Quem foi o primeiro presidente do Brasil?",
            options: ["Getúlio Vargas", "Deodoro da Fonseca", "Juscelino Kubitschek", "Tancredo Neves"],
            correct: 1
        }
    ],
    medium: [
        {
            question: "Qual é a derivada de x²?",
            options: ["x", "2x", "x²", "2x²"],
            correct: 1
        },
        {
            question: "Qual elemento químico tem símbolo Au?",
            options: ["Prata", "Ouro", "Alumínio", "Argônio"],
            correct: 1
        },
        {
            question: "Em que ano terminou a Segunda Guerra Mundial?",
            options: ["1944", "1945", "1946", "1947"],
            correct: 1
        },
        {
            question: "Qual é a velocidade da luz no vácuo?",
            options: ["300.000 km/s", "300.000.000 m/s", "3.000.000 km/s", "30.000 km/s"],
            correct: 1
        },
        {
            question: "Quem desenvolveu a teoria da relatividade?",
            options: ["Newton", "Einstein", "Galileu", "Darwin"],
            correct: 1
        },
        {
            question: "Qual é a raiz quadrada de 144?",
            options: ["11", "12", "13", "14"],
            correct: 1
        },
        {
            question: "Em que período literário se enquadra Machado de Assis?",
            options: ["Romantismo", "Realismo", "Modernismo", "Barroco"],
            correct: 1
        },
        {
            question: "Qual é a moeda oficial do Japão?",
            options: ["Won", "Yuan", "Yen", "Dong"],
            correct: 2
        },
        {
            question: "Quantos planetas tem o sistema solar?",
            options: ["7", "8", "9", "10"],
            correct: 1
        },
        {
            question: "Qual é o menor país do mundo?",
            options: ["Mônaco", "Vaticano", "Liechtenstein", "San Marino"],
            correct: 1
        }
    ],
    hard: [
        {
            question: "Qual é a integral de 2x dx?",
            options: ["x²", "x² + C", "2x²", "x² + 2C"],
            correct: 1
        },
        {
            question: "Qual lei física relaciona força, massa e aceleração?",
            options: ["Lei de Ohm", "Segunda Lei de Newton", "Lei de Hooke", "Lei de Coulomb"],
            correct: 1
        },
        {
            question: "Em que ano foi proclamada a República no Brasil?",
            options: ["1888", "1889", "1890", "1891"],
            correct: 1
        },
        {
            question: "Qual é o número de Avogadro?",
            options: ["6,02 × 10²³", "6,02 × 10²²", "6,02 × 10²⁴", "6,02 × 10²¹"],
            correct: 0
        },
        {
            question: "Quem escreveu 'Cem Anos de Solidão'?",
            options: ["Vargas Llosa", "Gabriel García Márquez", "Jorge Luis Borges", "Pablo Neruda"],
            correct: 1
        },
        {
            question: "Qual é a constante de Planck?",
            options: ["6,626 × 10⁻³⁴ J·s", "6,626 × 10⁻³³ J·s", "6,626 × 10⁻³⁵ J·s", "6,626 × 10⁻³² J·s"],
            correct: 0
        },
        {
            question: "Em que batalha Napoleão foi definitivamente derrotado?",
            options: ["Austerlitz", "Borodino", "Leipzig", "Waterloo"],
            correct: 3
        },
        {
            question: "Qual é o pH de uma solução neutra?",
            options: ["6", "7", "8", "9"],
            correct: 1
        },
        {
            question: "Quem propôs o modelo atômico com níveis de energia?",
            options: ["Rutherford", "Bohr", "Thomson", "Dalton"],
            correct: 1
        },
        {
            question: "Qual é a fórmula da lei de Ohm?",
            options: ["V = I × R", "P = V × I", "E = mc²", "F = ma"],
            correct: 0
        }
    ]
};

// Configurações de dificuldade
const difficultySettings = {
    easy: { timeLimit: 30, pointsPerQuestion: 10 },
    medium: { timeLimit: 20, pointsPerQuestion: 20 },
    hard: { timeLimit: 15, pointsPerQuestion: 30 }
};

// Dados de ranking (simulados)
const rankingData = {
    student: [
        { name: "Ana Silva", school: "E.E. João Silva", score: 2450, position: 1 },
        { name: "Pedro Santos", school: "Colégio São Paulo", score: 2350, position: 2 },
        { name: "Maria Costa", school: "Instituto Federal", score: 2280, position: 3 },
        { name: "Carlos Lima", school: "E.E. João Silva", score: 2150, position: 4 },
        { name: "Lucia Oliveira", school: "Escola Municipal Santos", score: 2050, position: 5 },
        { name: "João Silva", school: "E.E. João Silva", score: 1250, position: 15 }
    ],
    school: [
        { name: "Instituto Federal", score: 15680, position: 1 },
        { name: "Colégio São Paulo", score: 14350, position: 2 },
        { name: "E.E. João Silva", score: 13250, position: 3 },
        { name: "Escola Municipal Santos", score: 12150, position: 4 },
        { name: "Colégio Dom Pedro", score: 11250, position: 5 }
    ]
};

// Funções de navegação
function showMainMenu() {
    // Fechar todos os modais primeiro
    closeModal('resultModal');
    closeModal('rankingModal');
    closeModal('rulesModal');
    
    hideAllSections();
    document.getElementById('mainMenu').style.display = 'block';
}

function showLevelSelection() {
    // Fechar todos os modais primeiro
    closeModal('resultModal');
    closeModal('rankingModal');
    closeModal('rulesModal');
    
    hideAllSections();
    document.getElementById('levelSelection').style.display = 'block';
}

function hideAllSections() {
    const sections = ['mainMenu', 'levelSelection', 'gameArea'];
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.style.display = 'none';
        }
    });
}

// Inicializar jogo
function startGame(difficulty) {
    // Fechar todos os modais primeiro
    closeModal('resultModal');
    closeModal('rankingModal');
    closeModal('rulesModal');
    
    gameState = {
        currentQuestion: 0,
        score: 0,
        totalQuestions: 5,
        timeLeft: difficultySettings[difficulty].timeLimit,
        timer: null,
        difficulty: difficulty,
        correctAnswers: 0,
        gameStartTime: Date.now(),
        helpUsed: 3,
        isPaused: false
    };

    hideAllSections();
    document.getElementById('gameArea').style.display = 'block';
    
    loadQuestion();
    startTimer();
    updateGameInfo();
}

// Carregar questão
function loadQuestion() {
    const questions = questionsDatabase[gameState.difficulty];
    if (gameState.currentQuestion >= questions.length || gameState.currentQuestion >= gameState.totalQuestions) {
        endGame();
        return;
    }

    const question = questions[gameState.currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = `${String.fromCharCode(65 + index)}) ${option}`;
        optionElement.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionElement);
    });

    // Atualizar progresso
    const progress = ((gameState.currentQuestion + 1) / gameState.totalQuestions) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
    document.querySelector('.question-counter').textContent = 
        `Questão ${gameState.currentQuestion + 1} de ${gameState.totalQuestions}`;

    // Reset timer
    gameState.timeLeft = difficultySettings[gameState.difficulty].timeLimit;
    updateTimer();
}

// Selecionar resposta
function selectAnswer(selectedIndex) {
    if (gameState.isPaused) return;

    // Parar o timer imediatamente
    clearInterval(gameState.timer);
    
    const questions = questionsDatabase[gameState.difficulty];
    const question = questions[gameState.currentQuestion];
    const options = document.querySelectorAll('.option');
    
    // Desabilitar todas as opções
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Marcar resposta selecionada
    options[selectedIndex].classList.add('selected');
    
    // Processar resposta imediatamente
    if (selectedIndex === question.correct) {
        // Resposta correta
        gameState.correctAnswers++;
        const points = difficultySettings[gameState.difficulty].pointsPerQuestion;
        const timeBonus = Math.floor(gameState.timeLeft / 2);
        gameState.score += points + timeBonus;
        
        // Vibração de sucesso no mobile
        if (window.vibrateOnAnswer) {
            window.vibrateOnAnswer(true);
        }
        
        showFeedback(true, points + timeBonus);
    } else {
        // Resposta incorreta
        // Vibração de erro no mobile
        if (window.vibrateOnAnswer) {
            window.vibrateOnAnswer(false);
        }
        
        showFeedback(false, 0);
    }
    
    // Atualizar informações imediatamente
    updateGameInfo();
    
    // Mostrar resposta correta após um delay curto
    setTimeout(() => {
        options[question.correct].classList.add('correct');
        
        if (selectedIndex !== question.correct) {
            options[selectedIndex].classList.add('incorrect');
        }
        
        // Próxima questão após delay
        setTimeout(() => {
            gameState.currentQuestion++;
            
            // Verificar se ainda há questões
            if (gameState.currentQuestion >= gameState.totalQuestions) {
                endGame();
                return;
            }
            
            loadQuestion();
            startTimer();
        }, 1500);
        
    }, 300);
}

// Timer
function startTimer() {
    gameState.timer = setInterval(() => {
        if (!gameState.isPaused) {
            gameState.timeLeft--;
            updateTimer();
            
            if (gameState.timeLeft <= 0) {
                timeUp();
            }
        }
    }, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const gameTimerElement = document.querySelector('.game-timer');
    
    // Atualizar texto do timer
    timerElement.textContent = gameState.timeLeft;
    
    // Feedback visual baseado no tempo restante
    if (gameState.timeLeft <= 5) {
        gameTimerElement.style.color = '#ef4444';
        gameTimerElement.style.animation = 'pulse 0.5s infinite';
        gameTimerElement.style.fontWeight = '700';
    } else if (gameState.timeLeft <= 10) {
        gameTimerElement.style.color = '#f59e0b';
        gameTimerElement.style.animation = 'none';
        gameTimerElement.style.fontWeight = '600';
    } else {
        gameTimerElement.style.color = '#ef4444';
        gameTimerElement.style.animation = 'none';
        gameTimerElement.style.fontWeight = '600';
    }
}

function timeUp() {
    clearInterval(gameState.timer);
    
    // Mostrar resposta correta
    const questions = questionsDatabase[gameState.difficulty];
    const question = questions[gameState.currentQuestion];
    const options = document.querySelectorAll('.option');
    
    // Desabilitar todas as opções
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Mostrar resposta correta
    options[question.correct].classList.add('correct');
    showFeedback(false, 0, 'Tempo esgotado!');
    
    // Atualizar informações imediatamente
    updateGameInfo();
    
    setTimeout(() => {
        gameState.currentQuestion++;
        
        // Verificar se ainda há questões
        if (gameState.currentQuestion >= gameState.totalQuestions) {
            endGame();
            return;
        }
        
        loadQuestion();
        startTimer();
    }, 1500);
}

// Atualizar informações do jogo
function updateGameInfo() {
    // Atualizar pontuação com animação
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = gameState.score;
    scoreElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        scoreElement.style.transform = 'scale(1)';
    }, 200);
    
    // Atualizar progresso
    const progress = ((gameState.currentQuestion + 1) / gameState.totalQuestions) * 100;
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    // Atualizar contador de questões
    const questionCounter = document.querySelector('.question-counter');
    if (questionCounter) {
        questionCounter.textContent = `Questão ${gameState.currentQuestion + 1} de ${gameState.totalQuestions}`;
    }
    
    // Atualizar botão de ajuda
    const helpBtn = document.querySelector('.help-btn');
    if (helpBtn) {
        helpBtn.innerHTML = `<i class="fas fa-lightbulb"></i> Dica (${gameState.helpUsed})`;
        helpBtn.disabled = gameState.helpUsed <= 0;
        if (gameState.helpUsed <= 0) {
            helpBtn.style.opacity = '0.5';
        }
    }
}

// Sistema de ajuda
function useHelp() {
    if (gameState.helpUsed <= 0 || gameState.isPaused) return;
    
    gameState.helpUsed--;
    
    const questions = questionsDatabase[gameState.difficulty];
    const question = questions[gameState.currentQuestion];
    const options = document.querySelectorAll('.option');
    
    // Remover duas opções incorretas aleatórias
    const incorrectOptions = [];
    options.forEach((option, index) => {
        if (index !== question.correct) {
            incorrectOptions.push(index);
        }
    });
    
    // Embaralhar e remover 2
    const shuffled = incorrectOptions.sort(() => 0.5 - Math.random());
    for (let i = 0; i < 2 && i < shuffled.length; i++) {
        options[shuffled[i]].classList.add('disabled');
        options[shuffled[i]].style.pointerEvents = 'none';
    }
    
    updateGameInfo();
    showNotification('Duas opções incorretas foram removidas!', 'info');
}

// Pausar jogo
function pauseGame() {
    gameState.isPaused = !gameState.isPaused;
    
    const pauseBtn = document.querySelector('.pause-btn');
    if (gameState.isPaused) {
        pauseBtn.innerHTML = '<i class="fas fa-play"></i> Continuar';
        showNotification('Jogo pausado', 'info');
    } else {
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        showNotification('Jogo continuado', 'info');
    }
}

// Feedback de resposta
function showFeedback(isCorrect, points, customMessage = null) {
    const message = customMessage || (isCorrect ? `Correto! +${points} pontos` : 'Incorreto!');
    const type = isCorrect ? 'success' : 'error';
    showNotification(message, type);
}

// Finalizar jogo
function endGame() {
    clearInterval(gameState.timer);
    
    const totalTime = Math.floor((Date.now() - gameState.gameStartTime) / 1000);
    
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('correctAnswers').textContent = 
        `${gameState.correctAnswers}/${gameState.totalQuestions}`;
    document.getElementById('totalTime').textContent = `${totalTime}s`;
    
    // Determinar título baseado na performance
    const percentage = (gameState.correctAnswers / gameState.totalQuestions) * 100;
    let title = 'Parabéns!';
    if (percentage >= 90) {
        title = 'Excelente!';
    } else if (percentage >= 70) {
        title = 'Muito bom!';
    } else if (percentage >= 50) {
        title = 'Bom trabalho!';
    } else {
        title = 'Continue praticando!';
    }
    
    document.getElementById('resultTitle').textContent = title;
    showModal('resultModal');
}

// Jogar novamente
function playAgain() {
    closeModal('resultModal');
    showLevelSelection();
}

// Ir para menu principal (do modal de resultado)
function goToMainMenu() {
    closeModal('resultModal');
    showMainMenu();
}

// Mostrar ranking
function showRanking(type) {
    const title = type === 'student' ? 'Ranking de Estudantes' : 'Ranking de Escolas';
    document.getElementById('rankingTitle').textContent = title;
    
    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = '';
    
    const data = rankingData[type];
    
    data.forEach(item => {
        const rankingItem = document.createElement('div');
        rankingItem.className = 'ranking-item';
        
        let positionClass = '';
        if (item.position === 1) positionClass = 'gold';
        else if (item.position === 2) positionClass = 'silver';
        else if (item.position === 3) positionClass = 'bronze';
        
        rankingItem.innerHTML = `
            <div class="ranking-position ${positionClass}">${item.position}</div>
            <div class="ranking-info">
                <div class="ranking-name">${item.name}</div>
                ${type === 'student' ? `<div class="ranking-school">${item.school}</div>` : ''}
            </div>
            <div class="ranking-score">${item.score.toLocaleString()}</div>
        `;
        
        rankingList.appendChild(rankingItem);
    });
    
    showModal('rankingModal');
}

// Mostrar regras
function showRules() {
    showModal('rulesModal');
}

// Mostrar conquistas (placeholder)
function showAchievements() {
    showNotification('Seção de conquistas em desenvolvimento!', 'info');
}

// Mostrar perfil (placeholder)
function showProfile() {
    showNotification('Seção de perfil em desenvolvimento!', 'info');
}

// Logout
function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        window.location.href = 'index.html';
    }
}

// Gerenciamento de modais
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        
        // Adicionar evento para fechar clicando fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal && modal.style.display !== 'none') {
        modal.style.display = 'none';
        // Restaurar scroll do body se necessário
        document.body.style.overflow = 'auto';
    }
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remove notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
        padding: 1rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#22c55e' : '#6366f1'};
    `;
    
    document.body.appendChild(notification);
    
    // Remove automaticamente após 3 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Mobile detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Touch event handlers for mobile
function addTouchSupport() {
    if (isMobileDevice()) {
        // Prevent zoom on double tap
        let lastTap = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTap <= 300) {
                event.preventDefault();
            }
            lastTap = now;
        }, false);
        
        // Add swipe detection for modals
        let startY = 0;
        let startX = 0;
        
        document.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
        });
        
        document.addEventListener('touchmove', function(e) {
            // Prevent pull-to-refresh
            if (Math.abs(e.touches[0].clientY - startY) > 100 && e.touches[0].clientY < startY) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Add vibration feedback for correct/incorrect answers
        window.vibrateOnAnswer = function(isCorrect) {
            if (navigator.vibrate) {
                if (isCorrect) {
                    navigator.vibrate([100, 50, 100]); // Success pattern
                } else {
                    navigator.vibrate([200, 100, 200, 100, 200]); // Error pattern
                }
            }
        };
        
        // Improve touch interactions
        document.addEventListener('touchstart', function() {}, { passive: true });
    }
}

// Eventos de teclado (desktop only)
if (!isMobileDevice()) {
    document.addEventListener('keydown', function(e) {
        // ESC para fechar modais
        if (e.key === 'Escape') {
            const modals = ['resultModal', 'rankingModal', 'rulesModal'];
            modals.forEach(modalId => closeModal(modalId));
        }
        
        // Números 1-4 para selecionar opções durante o jogo
        if (e.key >= '1' && e.key <= '4') {
            const gameArea = document.getElementById('gameArea');
            if (gameArea && gameArea.style.display !== 'none' && !gameState.isPaused) {
                const optionIndex = parseInt(e.key) - 1;
                const options = document.querySelectorAll('.option');
                if (options[optionIndex] && options[optionIndex].style.pointerEvents !== 'none') {
                    selectAnswer(optionIndex);
                }
            }
        }
        
        // Espaço para pausar
        if (e.key === ' ') {
            const gameArea = document.getElementById('gameArea');
            if (gameArea && gameArea.style.display !== 'none') {
                e.preventDefault();
                pauseGame();
            }
        }
    });
} else {
    // Mobile-specific keyboard handling
    document.addEventListener('keydown', function(e) {
        // Only ESC for closing modals on mobile
        if (e.key === 'Escape') {
            const modals = ['resultModal', 'rankingModal', 'rulesModal'];
            modals.forEach(modalId => closeModal(modalId));
        }
    });
}

// Adicionar estilos CSS para animações
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(300px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(animationStyles);

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('PortGO Game inicializado!');
    
    // Inicializar suporte móvel
    addTouchSupport();
    
    // Verificar se o usuário está logado (simulação)
    const user = localStorage.getItem('portgo_user');
    if (!user) {
        // Simular dados do usuário
        localStorage.setItem('portgo_user', JSON.stringify({
            name: 'João Silva',
            email: 'joao@email.com',
            school: 'E.E. João Silva',
            level: 5,
            points: 1250
        }));
    }
});

// Mobile menu functions for game
function toggleMobileMenuGame() {
    // Para a página do jogo, vamos adaptar os elementos existentes
    const userInfo = document.querySelector('.user-info');
    const gameHeader = document.querySelector('.game-header');
    
    if (userInfo && gameHeader) {
        gameHeader.classList.toggle('mobile-menu-open');
        
        // Atualizar ícone se existir botão
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            const btnIcon = mobileMenuBtn.querySelector('i');
            if (gameHeader.classList.contains('mobile-menu-open')) {
                btnIcon.className = 'fas fa-times';
            } else {
                btnIcon.className = 'fas fa-bars';
            }
        }
    }
}

function closeMobileMenuGame() {
    const gameHeader = document.querySelector('.game-header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (gameHeader) {
        gameHeader.classList.remove('mobile-menu-open');
        
        if (mobileMenuBtn) {
            const btnIcon = mobileMenuBtn.querySelector('i');
            btnIcon.className = 'fas fa-bars';
        }
    }
}

// Tornar funções globais
window.toggleMobileMenuGame = toggleMobileMenuGame;
window.closeMobileMenuGame = closeMobileMenuGame;