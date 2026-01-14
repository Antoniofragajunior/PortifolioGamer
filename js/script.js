// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfólio Gamer iniciando...');
    
    // Inicializar todos os sistemas
    initScreenManager();
    initHudMenu();
    initProgressTracker();
    
    // Iniciar o carregamento
    startLoading();
});

// ==================== GESTÃO DE TELAS ====================
function initScreenManager() {
    console.log('Inicializando ScreenManager...');
    window.screenManager = {
        currentScreen: 0,
        screens: [
            'loading-screen', 
            'intro-screen', 
            'about-screen', 
            'skills-screen', 
            'formations-screen', 
            'projects-screen', 
            'contact-screen'
        ],
        
        showScreen: function(screenIndex) {
            if (screenIndex < 0 || screenIndex >= this.screens.length) return;
            
            // Esconder todas as telas
            this.screens.forEach(screenId => {
                const screen = document.getElementById(screenId);
                if (screen) {
                    screen.classList.add('hidden');
                }
            });
            
            // Mostrar a tela desejada
            const newScreen = document.getElementById(this.screens[screenIndex]);
            if (newScreen) {
                newScreen.classList.remove('hidden');
                this.currentScreen = screenIndex;
                
                // Executar animações específicas da tela
                this.handleScreenAnimations(screenIndex);
                
                // Atualizar botão do HUD
                if (window.hudMenu) {
                    window.hudMenu.updateHudButtonVisibility();
                }
            }
        },
        
        handleScreenAnimations: function(screenIndex) {
            switch(screenIndex) {
                case 2: // Sobre Mim
                    setTimeout(() => this.startAvatarAnimation(), 500);
                    break;
                case 3: // Skills
                    animateElements('.skill-item', { delay: 100 });
                    setTimeout(() => animateBars('.skill-hp-fill'), 300);
                    break;
                case 4: // Formações
                    animateElements('.timeline-item', { delay: 200, animation: 'fadeSlideRight' });
                    setTimeout(() => animateBars('.level-progress'), 300);
                    break;
                case 5: // Projetos
                    animateElements('.projeto-card-gamer', { delay: 100 });
                    loadProjects();
                    break;
                case 6: // Contato
                    animateElements('.contact-card', { delay: 100, animation: 'scaleIn' });
                    loadContact();
                    break;
            }
        },
        
        startAvatarAnimation: function() {
            const chatText = document.getElementById('chat-text');
            if (!chatText) return;
            
             const aboutText = 
    `🎮 GERALDO NETO | FULLSTACK DEVELOPER\n\n⚔️ ESPECIALIDADES:\n• Backend: PHP, Laravel, APIs REST\n• Frontend: JavaScript, jQuery, Bootstrap\n• Banco de Dados: MySQL\n• Infra: Docker, Git/GitHub\n\n🏆 EXPERIÊNCIA:\n+ 2 anos desenvolvendo sistemas web completos\n+ 15+ projetos entregues com sucesso\n+ Foco em segurança e performance\n\n🚀 MISSÃO ATUAL:\nCriar soluções robustas e escaláveis que resolvem\nproblemas reais. Transformar requisitos complexos\nem código limpo e eficiente.\n\n🎯 PRÓXIMO LEVEL:\nExpandindo para React/Node.js e arquiteturas\nmodernas. Sempre aprendendo, sempre evoluindo.\n\n💬 "O código é minha arte, o keyboard minha espada."\n\n🎮 Vamos criar algo incrível juntos? 🚀`;
            
            typeWriter(aboutText, chatText, 30);
        }
    };
}

// ==================== ANIMAÇÕES ====================
function animateElements(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    const {
        delay = 100,
        animation = 'fadeSlideUp',
        stagger = true
    } = options;
    
    elements.forEach((element, index) => {
        const elementDelay = stagger ? index * delay : delay;
        
        setTimeout(() => {
            element.style.animation = `${animation} 0.5s ease forwards`;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, elementDelay);
    });
}

function animateBars(selector, delay = 150) {
    document.querySelectorAll(selector).forEach((bar, index) => {
        setTimeout(() => {
            const level = bar.dataset.level || bar.getAttribute('data-level');
            if (level) {
                bar.style.width = `${level}%`;
                if (parseInt(level) >= 90) {
                    bar.classList.add('full');
                }
            }
        }, index * delay);
    });
}

function typeWriter(text, element, speed) {
    let i = 0;
    element.innerHTML = '';
    
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

// ==================== CARREGAMENTO INICIAL ====================
function startLoading() {
    console.log('Iniciando carregamento...');
    const loadingProgress = document.getElementById('loading-progress');
    
    if (!loadingProgress) {
        console.error('Elemento de progresso não encontrado!');
        setTimeout(() => window.screenManager.showScreen(1), 1000);
        return;
    }
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            loadingProgress.style.width = `${progress}%`;
            
            setTimeout(() => {
                console.log('Carregamento completo!');
                window.screenManager.showScreen(1);
                loadAllData();
                initPixelBackground();
            }, 500);
        } else {
            loadingProgress.style.width = `${progress}%`;
        }
    }, 100);
}

// ==================== CARREGAR DADOS ====================
function loadAllData() {
    loadHardSkills();
    loadSoftSkills();
    loadFormations();
    // Projects e Contact serão carregados quando a tela for aberta
}

function loadHardSkills() {
    const hardSkills = [
        { name: 'JAVASCRIPT', icon: 'fab fa-js', level: 90 },
        { name: 'REACT', icon: 'fab fa-react', level: 85 },
        { name: 'NODE.JS', icon: 'fab fa-node-js', level: 80 },
        { name: 'HTML/CSS', icon: 'fab fa-html5', level: 95 },
        { name: 'POSTGRESQL', icon: 'fas fa-database', level: 75 },
        { name: 'MYSQL', icon: 'fas fa-database', level: 70 },
        { name: 'GIT', icon: 'fab fa-git-alt', level: 85 },
        { name: 'PHP', icon: 'fab fa-php', level: 65 },
        { name: 'GITHUB', icon: 'fab fa-github', level: 90 }
    ];
    
    const container = document.getElementById('hard-skills');
    if (!container) return;
    
    container.innerHTML = hardSkills.map(skill => `
        <div class="skill-item">
            <div class="skill-icon">
                <i class="${skill.icon}" aria-hidden="true"></i>
            </div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-hp-container">
                <div class="skill-hp-label">
                    <span>HP</span>
                    <span class="hp-value">${skill.level}%</span>
                </div>
                <div class="skill-hp-bar" role="meter" aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100">
                    <div class="skill-hp-fill" data-level="${skill.level}"></div>
                </div>
            </div>
        </div>
    `).join('');
}

function loadSoftSkills() {
    const softSkills = [
        { name: 'COMUNICAÇÃO', icon: 'fas fa-comments', level: 90 },
        { name: 'TRABALHO EM EQUIPE', icon: 'fas fa-users', level: 95 },
        { name: 'RESOLUÇÃO DE PROBLEMAS', icon: 'fas fa-lightbulb', level: 85 },
        { name: 'ADAPTABILIDADE', icon: 'fas fa-exchange-alt', level: 80 },
        { name: 'PROATIVIDADE', icon: 'fas fa-bolt', level: 90 },
        { name: 'ORGANIZAÇÃO', icon: 'fas fa-tasks', level: 85 },
        { name: 'VISÃO', icon: 'fas fa-eye', level: 75 },
        { name: 'LIDERANÇA', icon: 'fas fa-users-cog', level: 70 }
    ];
    
    const container = document.getElementById('soft-skills');
    if (!container) return;
    
    container.innerHTML = softSkills.map(skill => `
        <div class="skill-item">
            <div class="skill-icon">
                <i class="${skill.icon}" aria-hidden="true"></i>
            </div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-hp-container">
                <div class="skill-hp-label">
                    <span>HP</span>
                    <span class="hp-value">${skill.level}%</span>
                </div>
                <div class="skill-hp-bar" role="meter" aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100">
                    <div class="skill-hp-fill" data-level="${skill.level}"></div>
                </div>
            </div>
        </div>
    `).join('');
}

function loadFormations() {
    const formations = [
        {
            icon: '🎓',
            title: 'BACHAREL EM DIREITO',
            year: '2018',
            description: 'Formado em Direito com experiência em análise de contratos e compliance. Atuei em escritórios de advocacia corporativa desenvolvendo habilidades analíticas e de negociação.',
            level: 85,
            badge: 'CONCLUÍDO',
            xp: '+1000 XP | ANÁLISE JURÍDICA DESBLOQUEADA'
        },
        {
            icon: '💻',
            title: 'DESENVOLVIMENTO FULLSTACK',
            year: '2020',
            description: 'Especializado em criar aplicações completas do frontend ao backend. Domínio de JavaScript, React, Node.js, bancos de dados e metodologias ágeis para desenvolvimento de software.',
            level: 90,
            badge: 'ESPECIALIZAÇÃO',
            xp: '+1500 XP | FULLSTACK MASTERY DESBLOQUEADA'
        },
        {
            icon: '🎨',
            title: 'UX/UI DESIGN',
            year: '2021',
            description: 'Focado em criar experiências de usuário intuitivas e interfaces visualmente atraentes. Domínio de ferramentas de design, princípios de usabilidade e design thinking.',
            level: 80,
            badge: 'CERTIFICADO',
            xp: '+1200 XP | DESIGN THINKING DESBLOQUEADO'
        },
        {
            icon: '🚀',
            title: 'JAVASCRIPT AVANÇADO',
            year: '2022',
            description: 'Domínio de conceitos avançados de JavaScript, ES6+, frameworks modernos e padrões de arquitetura. Especialização em performance, segurança e escalabilidade de aplicações.',
            level: 95,
            badge: 'EXPERT',
            xp: '+2000 XP | JAVASCRIPT NINJA DESBLOQUEADO'
        }
    ];
    
    const container = document.getElementById('timeline-container');
    if (!container) return;
    
    container.innerHTML = formations.map((formation, index) => `
        <div class="timeline-item">
            <div class="formation-card">
                <div class="formation-unlocked">
                    <i class="fas fa-lock-open"></i>
                </div>
                <div class="formation-header">
                    <div>
                        <div class="formation-icon">${formation.icon}</div>
                        <h3>${formation.title}</h3>
                    </div>
                    <span class="formation-year">${formation.year}</span>
                </div>
                <p>${formation.description}</p>
                <div class="formation-level">
                    <div class="level-label">
                        <span>CONHECIMENTO</span>
                        <span>${formation.level}%</span>
                    </div>
                    <div class="level-bar">
                        <div class="level-progress" data-level="${formation.level}"></div>
                    </div>
                </div>
                <span class="achievement-badge">${formation.badge}</span>
                <div class="sfx-text">${formation.xp}</div>
            </div>
        </div>
    `).join('');
}

function loadProjects() {
    const projects = [
        {
            title: 'WEBSITE INSTITUCIONAL UNES',
            xp: '+250 XP',
            description: 'Website institucional fictício desenvolvido apenas com HTML puro, simulando a página oficial de uma universidade chamada UNES. Prática de estruturação de páginas web, uso de tabelas, links de navegação e formulários de contato.',
            technologies: ['html5'],
            difficulty: 1,
            github: 'https://github.com/geraldoneto/unes-website',
            demo: '#',
            video: 'img/biscoito-zen.mp4',
            poster: 'https://via.placeholder.com/400x200/4f46e5/ffffff?text=UNES+PROJECT'
        },
        {
            title: 'WEBSITE ANNA BELLA',
            xp: '+400 XP',
            description: 'Website Anna Bella é um projeto fictício de portfólio desenvolvido com HTML e CSS. Simula um site de apresentação profissional com design simples e elegante. Conta com páginas de biografia, campanhas publicitárias e contatos, todas interligadas.',
            technologies: ['html5', 'css3'],
            difficulty: 2,
            github: 'https://github.com/geraldoneto/annabella-website',
            demo: '#',
            video: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
            poster: 'https://via.placeholder.com/400x200/22d3ee/ffffff?text=ANNA+BELLA'
        },
        {
            title: 'PORTFÓLIO PESSOAL RESPONSIVO',
            xp: '+600 XP',
            description: 'Portfólio pessoal desenvolvido com HTML, CSS e JavaScript. Inclui tema claro/escuro, barra de progresso ao rolar a página, animações suaves, integração com WhatsApp e design responsivo. Criado para apresentar habilidades, experiências e projetos de forma profissional e interativa.',
            technologies: ['html5', 'css3', 'js'],
            difficulty: 3,
            github: 'https://github.com/geraldoneto/personal-portfolio',
            demo: '#',
            video: 'https://assets.mixkit.co/videos/preview/mixkit-developer-looking-at-code-while-wearing-headphones-1233-large.mp4',
            poster: 'https://via.placeholder.com/400x200/f59e0b/ffffff?text=PORTFOLIO'
        }
    ];
    
    const container = document.getElementById('projects-grid');
    if (!container) return;
    
    container.innerHTML = projects.map((project, index) => {
        const difficultyLabels = ['INICIANTE', 'INTERMEDIÁRIO', 'AVANÇADO', 'EXPERT'];
        const stars = Array(project.difficulty).fill('<i class="fas fa-star"></i>').join('');
        
        const techIcons = {
            'html5': '<i class="fab fa-html5 html-icon tecnologia-icone" title="HTML5"></i>',
            'css3': '<i class="fab fa-css3-alt css-icon tecnologia-icone" title="CSS3"></i>',
            'js': '<i class="fab fa-js-square js-icon tecnologia-icone" title="JavaScript"></i>'
        };
        
        return `
            <div class="projeto-card-gamer visible">
                <div class="dificuldade-badge">
                    ${stars}
                    <span>${difficultyLabels[project.difficulty - 1]}</span>
                </div>
                
                <div class="video-container">
                    <video class="projeto-video" muted loop autoplay preload="metadata" poster="${project.poster}">
                        <source src="${project.video}" type="video/mp4">
                        Seu navegador não suporta vídeos HTML5.
                    </video>
                    
                    <div class="video-overlay">
                        <div class="play-btn">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                </div>
                
                <div class="projeto-conteudo">
                    <div class="projeto-header">
                        <h3 class="projeto-titulo">${project.title}</h3>
                        <div class="projeto-xp">
                            <i class="fas fa-bolt"></i>
                            <span>${project.xp}</span>
                        </div>
                    </div>
                    
                    <p class="projeto-descricao">${project.description}</p>
                    
                    <div class="projeto-tecnologias">
                        <div class="tecnologias-titulo">TECNOLOGIAS</div>
                        <div class="tecnologias-icones">
                            ${project.technologies.map(tech => techIcons[tech]).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="projeto-overlay">
                    <div class="overlay-botoes">
                        <a href="${project.github}" target="_blank" class="overlay-btn-gamer github-btn">
                            <i class="fab fa-github"></i> Ver no GitHub
                        </a>
                        <a href="${project.demo}" class="overlay-btn-gamer demo-btn">
                            <i class="fas fa-external-link-alt"></i> Acessar Demo
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Atualizar totais
    document.getElementById('total-missions').textContent = projects.length;
    document.getElementById('total-xp').textContent = `+${projects.reduce((sum, p) => sum + parseInt(p.xp.match(/\d+/)[0]), 0)} XP`;
}

function loadContact() {
    const contacts = [
        {
            icon: 'fas fa-envelope',
            title: 'EMAIL',
            content: 'contato@geraldoneto.com',
            note: 'Resposta em até 24h'
        },
        {
            icon: 'fas fa-phone',
            title: 'TELEFONE / WHATSAPP',
            content: '+55 (99) 99999-9999',
            note: 'Disponível das 9h às 18h'
        },
        {
            icon: 'fas fa-map-marker-alt',
            title: 'LOCALIZAÇÃO',
            content: 'Caxias - MA, Brasil',
            note: 'Trabalho remoto disponível'
        },
        {
            icon: 'fas fa-gamepad',
            title: 'DISPONÍVEL PARA',
            content: 'Freelance & Full-time',
            note: 'Remoto ou presencial'
        }
    ];
    
    const container = document.getElementById('contact-container');
    if (!container) return;
    
    container.innerHTML = contacts.map(contact => `
        <div class="contact-card">
            <div class="border-glow"></div>
            <div class="contact-icon">
                <i class="${contact.icon}" aria-hidden="true"></i>
            </div>
            <h3>${contact.title}</h3>
            <p>${contact.content}</p>
            <p class="contact-note">${contact.note}</p>
            <div class="contact-status"></div>
        </div>
    `).join('');
}

// ==================== BACKGROUND PIXELADO ====================
function initPixelBackground() {
    const canvas = document.getElementById('pixel-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    }
    
    function createParticles() {
        particles.length = 0;
        const count = Math.min(50, Math.floor(window.innerWidth * window.innerHeight / 5000));
        
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.3 + 0.1,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.y += particle.speed;
            if (particle.y > canvas.height) {
                particle.y = 0;
                particle.x = Math.random() * canvas.width;
            }
            
            ctx.fillStyle = `rgba(79, 70, 229, ${particle.opacity})`;
            ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        });
        
        requestAnimationFrame(animate);
    }
    
    // Inicializar
    resizeCanvas();
    animate();
    
    // Redimensionar quando a janela mudar
    window.addEventListener('resize', resizeCanvas);
}

// ==================== HUD MENU ====================
function initHudMenu() {
    console.log('Inicializando HUD Menu...');
    
    window.hudMenu = {
        isOpen: false,
        
        init: function() {
            this.hudMenu = document.getElementById('hud-menu');
            this.pauseOverlay = document.getElementById('pause-overlay');
            this.closeBtn = document.getElementById('close-hud');
            this.resumeBtn = document.getElementById('hud-resume');
            this.hudItems = document.querySelectorAll('.hud-item[data-target]');
            this.hudTriggerBtn = document.getElementById('hud-trigger-btn');
            
            this.setupEventListeners();
            this.animateBars();
        },
        
        setupEventListeners: function() {
            // Tecla ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' || e.key === 'Esc') {
                    e.preventDefault();
                    this.toggle();
                }
                
                // Hotkeys numéricas
                if (e.key >= '1' && e.key <= '5' && this.isOpen) {
                    const index = parseInt(e.key) - 1;
                    if (this.hudItems[index]) {
                        this.navigateTo(this.hudItems[index].dataset.target);
                    }
                }
            });
            
            // Botões
            if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
            if (this.resumeBtn) this.resumeBtn.addEventListener('click', () => this.close());
            if (this.hudTriggerBtn) this.hudTriggerBtn.addEventListener('click', () => this.open());
            if (this.pauseOverlay) this.pauseOverlay.addEventListener('click', () => this.close());
            
            // Itens do HUD
            this.hudItems.forEach(item => {
                item.addEventListener('click', () => {
                    const target = item.dataset.target;
                    this.navigateTo(target);
                });
            });
            
            // Botão START
            const startBtn = document.getElementById('start-btn');
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    window.screenManager.showScreen(2);
                });
            }
        },
        
        animateBars: function() {
            const bars = document.querySelectorAll('.bar-fill');
            bars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
        },
        
        updateHudButtonVisibility: function() {
            const currentScreen = document.querySelector('.screen:not(.hidden)');
            if (currentScreen && currentScreen.id !== 'loading-screen' && currentScreen.id !== 'intro-screen') {
                this.hudTriggerBtn.style.display = 'flex';
            } else {
                this.hudTriggerBtn.style.display = 'none';
            }
        },
        
        open: function() {
            if (this.isOpen) return;
            
            this.hudMenu.classList.add('active');
            this.pauseOverlay.classList.add('active');
            document.body.classList.add('menu-pause-open');
            this.isOpen = true;
            
            this.animateBars();
        },
        
        close: function() {
            if (!this.isOpen) return;
            
            this.hudMenu.classList.remove('active');
            this.pauseOverlay.classList.remove('active');
            document.body.classList.remove('menu-pause-open');
            this.isOpen = false;
        },
        
        toggle: function() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        },
        
        navigateTo: function(screenId) {
            this.close();
            
            const screens = [
                'loading-screen', 
                'intro-screen', 
                'about-screen', 
                'skills-screen', 
                'formations-screen', 
                'projects-screen', 
                'contact-screen'
            ];
            
            const screenIndex = screens.indexOf(screenId);
            if (screenIndex !== -1 && window.screenManager) {
                window.screenManager.showScreen(screenIndex);
            }
        }
    };
    
    // Inicializar o HUD
    window.hudMenu.init();
}

// ==================== PROGRESS TRACKER ====================
function initProgressTracker() {
    console.log('Inicializando ProgressTracker...');
    
    window.progressTracker = {
        progress: {
            about: false,
            skills: false,
            formations: false,
            projects: false,
            contact: false
        },
        totalXP: 0,
        
        init: function() {
            const savedProgress = localStorage.getItem('portfolioProgress');
            if (savedProgress) {
                this.progress = JSON.parse(savedProgress);
            }
            
            const savedXP = localStorage.getItem('portfolioXP');
            if (savedXP) {
                this.totalXP = parseInt(savedXP);
            }
            
            this.setupObservers();
        },
        
        setupObservers: function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id.replace('-screen', '');
                        this.unlock(sectionId);
                    }
                });
            }, { threshold: 0.5 });
            
            ['about', 'skills', 'formations', 'projects', 'contact'].forEach(id => {
                const element = document.getElementById(`${id}-screen`);
                if (element) observer.observe(element);
            });
        },
        
        unlock: function(section) {
            if (!this.progress[section]) {
                this.progress[section] = true;
                this.totalXP += 100;
                this.saveProgress();
                this.showNotification(`+100 XP | ${section.toUpperCase()} DESBLOQUEADO!`);
            }
        },
        
        saveProgress: function() {
            localStorage.setItem('portfolioProgress', JSON.stringify(this.progress));
            localStorage.setItem('portfolioXP', this.totalXP.toString());
        },
        
        showNotification: function(message) {
            const notification = document.createElement('div');
            notification.className = 'xp-notification';
            notification.textContent = message;
            notification.setAttribute('role', 'alert');
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }
    };
    
    // Inicializar o tracker
    window.progressTracker.init();
}

// ==================== NAVEGAÇÃO POR TECLADO ====================
document.addEventListener('keydown', function(e) {
    if (!window.screenManager) return;
    
    // Navegação com setas
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        window.screenManager.showScreen(Math.min(window.screenManager.currentScreen + 1, window.screenManager.screens.length - 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        window.screenManager.showScreen(Math.max(window.screenManager.currentScreen - 1, 0));
    }
});

// ==================== SETUP DOS VÍDEOS ====================
function setupVideoControls() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.play-btn')) {
            const playBtn = e.target.closest('.play-btn');
            const videoContainer = playBtn.closest('.video-container');
            const video = videoContainer.querySelector('.projeto-video');
            
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    });
    
    // Pausar vídeos quando sair do card
    document.querySelectorAll('.projeto-card-gamer').forEach(card => {
        card.addEventListener('mouseleave', function() {
            const video = this.querySelector('.projeto-video');
            const playBtn = this.querySelector('.play-btn');
            
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            
            if (playBtn) {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    });
}

// Inicializar controles de vídeo quando o DOM estiver pronto
setTimeout(setupVideoControls, 1000);

// ==================== FALLBACK DE CARREGAMENTO ====================
setTimeout(function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        console.log('Fallback: Indo para tela de introdução');
        window.screenManager.showScreen(1);
    }
}, 5000);

// ==================== REDUZIR ANIMAÇÕES ====================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-speed', '0.01ms');
}

console.log('Portfólio Gamer inicializado com sucesso!');