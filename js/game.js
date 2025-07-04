// Estado do jogo
let gameState = {
    currentQuestion: 0,
    score: 0,
    totalQuestions: 10,
    timeLeft: 999999, // Timer desabilitado - tempo infinito
    timer: null,
    difficulty: 'easy',
    correctAnswers: 0,
    gameStartTime: null,
    helpUsed: 3,
    isPaused: false,
    userAnswers: [] // Para salvar as respostas do usuário
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
    const sections = ['mainMenu', 'levelSelection', 'gameArea', 'feedbackScreen'];
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
        timeLeft: 999999, // Timer desabilitado - tempo infinito
        timer: null,
        difficulty: difficulty,
        correctAnswers: 0,
        gameStartTime: Date.now(),
        helpUsed: 3,
        isPaused: false,
        userAnswers: [] // Para salvar as respostas do usuário
    };

    hideAllSections();
    document.getElementById('gameArea').style.display = 'block';
    
    loadQuestion();
    // startTimer(); // Timer desabilitado
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

    // Timer desabilitado - não resetar tempo
    gameState.timeLeft = 999999; // Tempo infinito
    updateTimer();
}

// Selecionar resposta
function selectAnswer(selectedIndex) {
    if (gameState.isPaused) return;

    // Timer desabilitado - não há timer para parar
    // clearInterval(gameState.timer);
    
    const questions = questionsDatabase[gameState.difficulty];
    const question = questions[gameState.currentQuestion];
    const options = document.querySelectorAll('.option');
    
    // Desabilitar todas as opções
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Marcar resposta selecionada
    options[selectedIndex].classList.add('selected');
    
    // Salvar a resposta do usuário
    gameState.userAnswers[gameState.currentQuestion] = {
        questionIndex: gameState.currentQuestion,
        userChoice: selectedIndex,
        correctChoice: question.correct,
        isCorrect: selectedIndex === question.correct,
        question: question
    };

    // Processar resposta imediatamente
    if (selectedIndex === question.correct) {
        // Resposta correta
        gameState.correctAnswers++;
        const points = difficultySettings[gameState.difficulty].pointsPerQuestion;
        const timeBonus = 0; // Não há bônus de tempo quando o timer está desabilitado
        gameState.score += points + timeBonus;
        
        // Vibração de sucesso no mobile
        if (window.vibrateOnAnswer) {
            window.vibrateOnAnswer(true);
        }
        
        showFeedback(true, points, 'Correto! +' + points + ' pontos');
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
            // startTimer(); // Timer desabilitado
        }, 1500);
        
    }, 300);
}

// Timer (DESABILITADO)
function startTimer() {
    // Timer desabilitado - não faz nada
    console.log('Timer desabilitado');
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const gameTimerElement = document.querySelector('.game-timer');
    
    // Timer desabilitado - ocultar elementos visuais
    if (timerElement) {
        timerElement.textContent = '∞'; // Mostrar infinito
    }
    
    if (gameTimerElement) {
        gameTimerElement.style.color = '#10b981'; // Verde para indicar sem limite
        gameTimerElement.style.animation = 'none';
        gameTimerElement.style.fontWeight = '600';
    }
}

function timeUp() {
    // Função timeUp desabilitada - não executa mais
    console.log('Função timeUp desabilitada - Timer não está ativo');
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
    
    // Mostrar balão de sugestão ao invés de excluir opções
    showHintBalloon();
    
    updateGameInfo();
    showNotification('Dica ativada! Veja o balão de sugestão.', 'info');
}

// Função para mostrar balão de sugestão
function showHintBalloon() {
    // Remover balão existente se houver
    const existingBalloon = document.getElementById('hintBalloon');
    if (existingBalloon) {
        existingBalloon.remove();
    }
    
    // Criar balão de sugestão
    const balloon = document.createElement('div');
    balloon.id = 'hintBalloon';
    balloon.className = 'hint-balloon';
    
    // Texto de sugestão Lorem Ipsum contextual
    const hintTexts = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pense nas regras fundamentais da gramática para resolver esta questão. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Ut enim ad minim veniam, quis nostrud exercitation. Considere o contexto e as estruturas linguísticas apresentadas. Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Analise cada alternativa cuidadosamente observando as regras ortográficas.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lembre-se das regras de acentuação e pontuação.',
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Observe os padrões linguísticos e a estrutura das frases apresentadas.'
    ];
    
    const randomHint = hintTexts[Math.floor(Math.random() * hintTexts.length)];
    
    balloon.innerHTML = `
        <div class="hint-balloon-content">
            <div class="hint-balloon-header">
                <i class="fas fa-lightbulb"></i>
                <span>Dica de Estudo</span>
                <button class="hint-balloon-close" onclick="closeHintBalloon()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="hint-balloon-text">
                ${randomHint}
            </div>
        </div>
    `;
    
    // Adicionar balão ao DOM
    document.body.appendChild(balloon);
    
    // Animar entrada do balão
    setTimeout(() => {
        balloon.classList.add('show');
    }, 100);
    
    // Auto-fechar após 10 segundos
    setTimeout(() => {
        closeHintBalloon();
    }, 10000);
}

// Função para fechar balão de sugestão
function closeHintBalloon() {
    const balloon = document.getElementById('hintBalloon');
    if (balloon) {
        balloon.classList.remove('show');
        setTimeout(() => {
            balloon.remove();
        }, 300);
    }
}



// Encerrar jogo antecipadamente
function endGameEarly() {
    // Confirmar se o usuário realmente quer encerrar
    if (confirm('Tem certeza que deseja encerrar o jogo? As questões não respondidas serão marcadas como incorretas.')) {
        // Marcar questões não respondidas como incorretas
        for (let i = gameState.currentQuestion; i < gameState.totalQuestions; i++) {
            if (!gameState.userAnswers[i]) {
                gameState.userAnswers[i] = {
                    question: questionsDatabase[gameState.difficulty][i],
                    questionIndex: i,
                    userChoice: -1, // Não respondida
                    correctChoice: questionsDatabase[gameState.difficulty][i].correct,
                    isCorrect: false
                };
            }
        }
        
        // Ir para tela de feedback
        showFeedbackScreen();
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
    // Timer desabilitado - não há timer para parar
    // clearInterval(gameState.timer);
    
    // Verificar se existe tela de feedback, se não, usar modal padrão
    const feedbackScreen = document.getElementById('feedbackScreen');
    if (feedbackScreen) {
        showFeedbackScreen();
    } else {
        // Fallback para modal padrão
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
}

function showFeedbackScreen() {
    // Ocultar todas as seções e mostrar tela de feedback
    hideAllSections();
    const feedbackScreen = document.getElementById('feedbackScreen');
    if (feedbackScreen) {
        feedbackScreen.style.display = 'block';

        // Calcular estatísticas
        const percentage = Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100);
        
        // Determinar título e mensagem baseado na performance
        let title = 'Parabéns!';
        let subtitle = 'Você concluiu o desafio!';
        let message = 'Continue praticando para melhorar ainda mais!';
        
        if (percentage >= 90) {
            title = 'Excelente!';
            subtitle = 'Performance excepcional!';
            message = 'Você demonstrou um conhecimento impressionante! Continue assim!';
        } else if (percentage >= 70) {
            title = 'Muito bom!';
            subtitle = 'Ótimo desempenho!';
            message = 'Você está no caminho certo! Parabéns pelo bom resultado!';
        } else if (percentage >= 50) {
            title = 'Bom trabalho!';
            subtitle = 'Você está progredindo!';
            message = 'Continue estudando e você chegará lá! Cada tentativa é um aprendizado!';
        } else {
            title = 'Continue tentando!';
            subtitle = 'Não desista!';
            message = 'O aprendizado é um processo. Continue praticando e você verá a melhoria!';
        }

        // Atualizar elementos da tela
        const titleElement = document.getElementById('feedbackTitle');
        const subtitleElement = document.getElementById('feedbackSubtitle');
        const scoreElement = document.getElementById('feedbackScore');
        const correctElement = document.getElementById('feedbackCorrect');
        const percentageElement = document.getElementById('feedbackPercentage');
        const messageElement = document.getElementById('feedbackPerformanceMessage');

        if (titleElement) titleElement.textContent = title;
        if (subtitleElement) subtitleElement.textContent = subtitle;
        if (scoreElement) scoreElement.textContent = gameState.score;
        if (correctElement) correctElement.textContent = gameState.correctAnswers;
        if (percentageElement) percentageElement.textContent = percentage + '%';
        if (messageElement) messageElement.textContent = message;

        // Gerar gabarito
        generateGameResults();
    }
}

function generateGameResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '';

    gameState.userAnswers.forEach((answer, index) => {
        const question = answer.question || questionsDatabase[gameState.difficulty][answer.questionIndex];
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;

        const statusIcon = answer.isCorrect ? '✓' : '✗';
        const statusClass = answer.isCorrect ? 'correct' : 'incorrect';

        let userChoiceText = '';
        if (answer.userChoice === -1) {
            userChoiceText = 'Tempo esgotado';
        } else {
            userChoiceText = question.options[answer.userChoice];
        }

        resultItem.innerHTML = `
            <div class="result-header">
                <div class="result-status ${statusClass}">
                    ${statusIcon}
                </div>
                <div class="result-question">
                    ${index + 1}. ${question.question}
                </div>
            </div>
            <div class="result-answers">
                <div class="result-answer user-answer ${answer.isCorrect ? '' : 'incorrect'}">
                    <div class="result-answer-letter">${answer.userChoice === -1 ? '⏰' : String.fromCharCode(65 + answer.userChoice)}</div>
                    <div class="result-answer-text">
                        <strong>Sua resposta:</strong> ${userChoiceText}
                    </div>
                </div>
                <div class="result-answer correct-answer">
                    <div class="result-answer-letter">${String.fromCharCode(65 + answer.correctChoice)}</div>
                    <div class="result-answer-text">
                        <strong>Resposta correta:</strong> ${question.options[answer.correctChoice]}
                    </div>
                </div>
            </div>
        `;

        resultsContainer.appendChild(resultItem);
    });
}

// Funções para os botões da tela de feedback
function restartGame() {
    showLevelSelection();
}

function backToMenu() {
    showMainMenu();
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
        // ESC para fechar modais e balão de dica
        if (e.key === 'Escape') {
            const modals = ['resultModal', 'rankingModal', 'rulesModal'];
            modals.forEach(modalId => closeModal(modalId));
            closeHintBalloon();
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
                                    endGameEarly();
            }
        }
    });
} else {
    // Mobile-specific keyboard handling
    document.addEventListener('keydown', function(e) {
        // Only ESC for closing modals and hint balloon on mobile
        if (e.key === 'Escape') {
            const modals = ['resultModal', 'rankingModal', 'rulesModal'];
            modals.forEach(modalId => closeModal(modalId));
            closeHintBalloon();
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