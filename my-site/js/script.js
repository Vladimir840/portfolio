        // Custom cursor
        const cursor = document.querySelector('.cursor');
        const interactiveElements = document.querySelectorAll('a, button, .feature-card');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Для динамичного расчёта высоты навигации
 
function updateHeroPadding() {
    const nav = document.querySelector('nav');
    const hero = document.querySelector('.hero');
    const navHeight = nav.offsetHeight;
    hero.style.paddingTop = navHeight + 'px';
       }
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Counter animation
        const animateCounters = () => {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const increment = target / 100;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animateCounters, 50);
                } else {
                    counter.innerText = target;
                }
            });
        };

        // Trigger counter animation when stats section is visible
        const statsSection = document.getElementById('stats');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);

        // Create particles
        const createParticles = () => {
            const hero = document.querySelector('.hero');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                hero.appendChild(particle);
            }
        };

        createParticles();

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = e.target.querySelector('.submit-btn');
            submitBtn.textContent = 'Надсилаємо...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Надіслано! ✓';
                submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00f5ff)';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Надіслати заявку';
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(45deg, #00f5ff, #ff0080)';
                    e.target.reset();
                }, 2000);
            }, 1500);
        });

        // Add typing effect to hero title
        const heroTitle = document.querySelector('.hero-title');
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);