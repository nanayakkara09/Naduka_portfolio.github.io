// Create and animate stars
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);

    // Create 200 stars
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration between 1s and 3s
        const duration = Math.random() * 2 + 1;
        star.style.setProperty('--duration', `${duration}s`);
        
        // Random delay
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        starsContainer.appendChild(star);
    }
}

// Create hero stars
function createHeroStars() {
    const heroSection = document.querySelector('.hero');
    const heroStarsContainer = document.createElement('div');
    heroStarsContainer.className = 'hero-stars';
    heroSection.appendChild(heroStarsContainer);

    // Create 50 special hero stars
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'hero-star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size between 2px and 4px
        const size = Math.random() * 2 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration between 2s and 4s
        const duration = Math.random() * 2 + 2;
        star.style.setProperty('--duration', `${duration}s`);
        
        // Random delay
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        heroStarsContainer.appendChild(star);
    }
}

// Initialize stars when page loads
window.addEventListener('load', () => {
    createStars();
    createHeroStars();
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Typing Animation for Hero Section
const heroText = document.querySelector('.hero-content h2');
const text = "Web Developer & UI/UX Designer";
let charIndex = 0;

function typeText() {
    if (charIndex < text.length) {
        heroText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    heroText.textContent = '';
    typeText();
});

// Skill Progress Bars Animation
const progressBars = document.querySelectorAll('.progress-bar');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
};

// Animate progress bars when skills section is in view
const skillsSection = document.querySelector('#skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            skillsObserver.unobserve(entry.target);
        }
    });
});

skillsObserver.observe(skillsSection);

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileNavLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    mobileNavLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project Cards Lightbox
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        const tags = Array.from(card.querySelectorAll('.project-tags span')).map(tag => tag.textContent);

        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close">&times;</span>
                <img src="${img}" alt="${title}">
                <div class="lightbox-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <div class="lightbox-tags">
                        ${tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Add animation class after a small delay
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);

        lightbox.querySelector('.close').addEventListener('click', () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("Huhq3ausmMUZzPBJC");
})();

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    try {
        // Send email using EmailJS
        await emailjs.send('service_dlyyiqr', 'template_rg8y413', {
            to_email: 'kawyanvvw@gmail.com',
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        });

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Message sent successfully!</span>
        `;
        contactForm.appendChild(successMessage);

        // Clear form
        contactForm.reset();

        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.classList.add('fade-out');
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 3000);
    } catch (error) {
        console.error('EmailJS Error:', error);
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>Failed to send message. Please try again.</span>
        `;
        contactForm.appendChild(errorMessage);

        // Remove error message after 3 seconds
        setTimeout(() => {
            errorMessage.classList.add('fade-out');
            setTimeout(() => {
                errorMessage.remove();
            }, 300);
        }, 3000);
    } finally {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});

// Add CSS for lightbox and success message
const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .lightbox.active {
        opacity: 1;
    }

    .lightbox-content {
        position: relative;
        max-width: 800px;
        width: 90%;
        background: var(--dark-gray);
        border: 2px solid var(--neon-blue);
        border-radius: 20px;
        overflow: hidden;
        transform: scale(0.9);
        transition: transform 0.3s;
        box-shadow: var(--neon-blue-glow);
    }

    .lightbox.active .lightbox-content {
        transform: scale(1);
    }

    .lightbox-content img {
        width: 100%;
        max-height: 500px;
        object-fit: cover;
    }

    .lightbox-info {
        padding: 20px;
    }

    .lightbox-info h3 {
        color: var(--neon-blue);
        margin-bottom: 10px;
        text-shadow: var(--neon-blue-glow);
    }

    .lightbox-tags {
        display: flex;
        gap: 10px;
        margin-top: 15px;
        flex-wrap: wrap;
    }

    .lightbox-tags span {
        padding: 5px 10px;
        background: rgba(0, 243, 255, 0.1);
        border: 1px solid var(--neon-blue);
        border-radius: 15px;
        font-size: 0.8rem;
        color: var(--neon-blue);
    }

    .close {
        position: absolute;
        top: 20px;
        right: 20px;
        color: var(--neon-blue);
        font-size: 30px;
        cursor: pointer;
        transition: all 0.3s;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid var(--neon-blue);
        border-radius: 50%;
        box-shadow: var(--neon-blue-glow);
    }

    .close:hover {
        transform: rotate(90deg);
        background: var(--neon-blue);
        color: var(--dark-bg);
    }

    .success-message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--neon-blue);
        color: var(--dark-bg);
        padding: 15px 30px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease-out;
        box-shadow: var(--neon-blue-glow);
    }

    .success-message.fade-out {
        animation: slideOut 0.3s ease-out forwards;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    /* Mobile Navigation */
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.95);
            padding: 20px;
            flex-direction: column;
            align-items: center;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s;
        }

        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
        }

        .nav-toggle.active .bar:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .nav-toggle.active .bar:nth-child(2) {
            opacity: 0;
        }

        .nav-toggle.active .bar:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }
`;

document.head.appendChild(style);
