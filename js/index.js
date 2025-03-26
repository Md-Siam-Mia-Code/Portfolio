document.addEventListener("DOMContentLoaded", function () {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or use prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    // Theme toggle event listener
    themeToggle.addEventListener('change', function () {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    mobileMenuBtn.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate skill progress bars when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, { threshold: 0.5 });

    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        observer.observe(skillsContainer);
    }

    // Fade-in animation for elements with fade-in class
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // Project slider functionality
    const sliderContainer = document.querySelector('.slider-container');
    const sliderCards = document.querySelectorAll('.slider-card');
    const prevButton = document.querySelector('.slider-nav button:first-child');
    const nextButton = document.querySelector('.slider-nav button:last-child');
    const sliderDots = document.querySelector('.slider-dots');

    let currentSlide = 0;
    const totalSlides = sliderCards.length;

    // Initialize slider
    function initSlider() {
        // Create dots
        sliderDots.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }

        updateSlider();
    }

    // Update slider positions
    function updateSlider() {
        sliderCards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next', 'prev-2', 'next-2');

            if (index === currentSlide) {
                card.classList.add('active');
            } else if (index === currentSlide - 1 || index === currentSlide + totalSlides - 1) {
                card.classList.add('prev');
            } else if (index === currentSlide + 1 || index === currentSlide - totalSlides + 1) {
                card.classList.add('next');
            } else if (index === currentSlide - 2 || index === currentSlide + totalSlides - 2) {
                card.classList.add('prev-2');
            } else if (index === currentSlide + 2 || index === currentSlide - totalSlides + 2) {
                card.classList.add('next-2');
            }
        });

        // Update active dot
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    // Go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index % totalSlides;
        updateSlider();
    }

    // Event listeners
    if (nextButton) nextButton.addEventListener('click', nextSlide);
    if (prevButton) prevButton.addEventListener('click', prevSlide);

    // Initialize slider after a short delay to ensure all elements are loaded
    setTimeout(initSlider, 100);
});
