// Gerenciamento de Modais
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Adiciona evento para fechar modal clicando fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Funções dos modais movidas para o final do arquivo

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Animações de entrada
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.style.transform = 'translateY(50px)';
        el.style.opacity = '0';
        el.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        observer.observe(el);
    });
}

// Validação de formulários
function validateLoginForm() {
    const form = document.querySelector('.login-form');
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');
    
    // Validações simples
    if (!email.value || !email.value.includes('@')) {
        showNotification('Por favor, insira um e-mail válido', 'error');
        return false;
    }
    
    if (!password.value || password.value.length < 6) {
        showNotification('A senha deve ter pelo menos 6 caracteres', 'error');
        return false;
    }
    
    return true;
}

function validateRegisterForm() {
    const form = document.querySelector('.register-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    const passwords = form.querySelectorAll('input[type="password"]');
    const checkbox = form.querySelector('input[type="checkbox"]');
    
    // Verifica campos obrigatórios
    for (let input of inputs) {
        if (!input.value.trim()) {
            showNotification('Todos os campos são obrigatórios', 'error');
            return false;
        }
    }
    
    // Verifica se as senhas coincidem
    if (passwords[0].value !== passwords[1].value) {
        showNotification('As senhas não coincidem', 'error');
        return false;
    }
    
    // Verifica senha forte
    if (passwords[0].value.length < 6) {
        showNotification('A senha deve ter pelo menos 6 caracteres', 'error');
        return false;
    }
    
    // Verifica checkbox dos termos
    if (!checkbox.checked) {
        showNotification('Você deve aceitar os termos de uso', 'error');
        return false;
    }
    
    return true;
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
    
    // Adiciona estilos inline para a notificação
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
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Navegação suave
function smoothScroll(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animação do contador das estatísticas
function animateCounters() {
    const statItems = document.querySelectorAll('.stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItem = entry.target;
                const countElement = statItem.querySelector('h3');
                const targetCount = parseInt(statItem.dataset.count);
                
                animateNumber(countElement, 0, targetCount, 2000);
                observer.unobserve(statItem);
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => observer.observe(item));
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (range * easeOutCubic));
        
        if (end >= 1000) {
            element.textContent = current.toLocaleString() + '+';
        } else {
            element.textContent = current + '+';
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Simulação de login/cadastro
function handleLogin(event) {
    event.preventDefault();
    
    // Login simplificado - aceita qualquer entrada
    showNotification('Login realizado com sucesso!', 'success');
    setTimeout(() => {
        closeModal('loginModal');
        // Redirecionar para página de jogo
        window.location.href = 'game.html';
    }, 1000);
}

function handleRegister(event) {
    event.preventDefault();
    
    // Cadastro simplificado - aceita qualquer entrada
    showNotification('Conta criada com sucesso!', 'success');
    setTimeout(() => {
        closeModal('registerModal');
        // Redirecionar para página de jogo
        window.location.href = 'game.html';
    }, 1000);
}

// Efeitos de hover para cards de questão
function addQuestionCardEffects() {
    const questionCard = document.querySelector('.question-card');
    if (questionCard) {
        questionCard.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0deg) scale(1.05)';
        });
        
        questionCard.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(5deg) scale(1)';
        });
    }
}

// Funcionalidade FAQ
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Toggle active class
    faqItem.classList.toggle('active');
    
    // Animate icon
    if (faqItem.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        icon.style.transform = 'rotate(0deg)';
        answer.style.maxHeight = '0';
    }
}

// Animação de entrada dos elementos
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.classList.add('animate-ready');
        observer.observe(element);
    });
}

// Parallax effect para elementos flutuantes
function initParallax() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * speed * 0.1}deg)`;
        });
    });
}

// Smooth scroll para links de navegação
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Adicionar efeito de hover nos cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Typewriter effect para o título principal
function typewriterEffect() {
    const title = document.querySelector('.hero-text h2');
    if (!title) return;
    
    // Pular o efeito typewriter para evitar problemas com HTML
    // Simplesmente adicionar uma animação de fade-in
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'all 0.8s ease';
    
    setTimeout(() => {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 500);
}

// Inicialização quando o DOM carrega
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página PortGO carregada!');
    
    // Inicializar todas as funcionalidades
    animateCounters();
    addScrollAnimations();
    initParallax();
    initSmoothScroll();
    addCardHoverEffects();
    typewriterEffect();
    
    // Adicionar classe para animações CSS
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Adicionar classe ativa ao link atual
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                closeMobileMenu();
            }
        });
    });

    // Header fixo com efeito de scroll
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

function closeMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.remove('mobile-open');
}

// Tornar funções globais para uso no HTML
window.toggleFaq = toggleFaq;
window.toggleMobileMenu = toggleMobileMenu;

// Adiciona estilos para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(300px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
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
    
    .loaded {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Funções do Menu Mobile
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

function closeMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.remove('mobile-open');
}

// Funções dos Modais
function showLoginModal() {
    // Fechar modal de registro se estiver aberto
    document.getElementById('registerModal').style.display = 'none';
    // Abrir modal de login
    document.getElementById('loginModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function showRegisterModal() {
    // Fechar modal de login se estiver aberto
    document.getElementById('loginModal').style.display = 'none';
    // Abrir modal de registro
    document.getElementById('registerModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    // Fechar ambos os modais
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('registerModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
document.addEventListener('click', (e) => {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (e.target === loginModal || e.target === registerModal) {
        closeModal();
    }
});

// Animação dos números nas estatísticas
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const interval = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString() + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current).toLocaleString() + '+';
            }
        }, interval);
    });
}

// Animação do timer na preview do jogo
function animateTimer() {
    const timerBar = document.querySelector('.timer-bar');
    if (timerBar) {
        timerBar.style.width = '0%';
        setTimeout(() => {
            timerBar.style.width = '100%';
        }, 100);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Animar números quando a seção estiver visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Animar timer a cada 30 segundos
    setInterval(animateTimer, 30000);
    animateTimer();

    // Adicionar classe active ao link do menu atual
    const currentPath = window.location.hash;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header fixo com efeito de scroll
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Animação do preview do jogo
const gamePreview = document.querySelector('.game-preview');
if (gamePreview) {
    gamePreview.addEventListener('mousemove', (e) => {
        const rect = gamePreview.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        gamePreview.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    gamePreview.addEventListener('mouseleave', () => {
        gamePreview.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Animação dos botões
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-login').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar classe ativa ao link atual
    const currentPath = window.location.pathname;
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}); 