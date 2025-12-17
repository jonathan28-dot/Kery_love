// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initFadeInAnimations();
    initNoButtonBehavior();
    initAffirmationButton();
    initHeartsAnimation();
    initConfettiAnimation();
    initRainAnimation();
    
    // Add click effects to buttons
    document.querySelectorAll('a, button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create a ripple effect
            createRippleEffect(this, e);
        });
    });
});

// No button special behavior
function initNoButtonBehavior() {
    const noBtn = document.getElementById('noBtn');
    
    if (noBtn) {
        // Move button when hovered
        noBtn.addEventListener('mouseover', function() {
            if (Math.random() > 0.5) {
                this.style.transform = 'translateX(20px)';
            } else {
                this.style.transform = 'translateX(-20px)';
            }
            
            // Change text sometimes
            if (Math.random() > 0.7) {
                const originalText = '<i class="fas fa-times"></i> No, maybe later';
                const sadText = '<i class="fas fa-frown"></i> Are you sure?';
                this.innerHTML = Math.random() > 0.5 ? sadText : originalText;
                
                // Revert after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
        
        // Reset position when mouse leaves
        noBtn.addEventListener('mouseout', function() {
            this.style.transform = 'translateX(0)';
        });
        
        // On click, show a sad message before redirecting
        noBtn.addEventListener('click', function(e) {
            // Don't prevent default immediately
            setTimeout(() => {
                // This will allow the link to work normally
            }, 100);
        });
    }
}

// Fade-in animations for elements
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-item');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Check on load and scroll
    fadeInOnScroll();
    window.addEventListener('scroll', fadeInOnScroll);
}

// Affirmation repeat button
function initAffirmationButton() {
    const repeatBtn = document.getElementById('repeatAffirmation');
    
    if (repeatBtn) {
        repeatBtn.addEventListener('click', function() {
            const affirmationBox = this.closest('.affirmation-box');
            const affirmationText = affirmationBox.querySelector('.affirmation-text');
            
            // Add visual feedback
            this.innerHTML = '<i class="fas fa-check"></i> Read Again';
            this.style.background = '#88b04b';
            
            // Briefly highlight the text
            affirmationText.style.color = '#e63946';
            affirmationText.style.transition = 'color 0.5s ease';
            
            setTimeout(() => {
                affirmationText.style.color = '';
                this.innerHTML = '<i class="fas fa-redo"></i> Read This Again';
                this.style.background = '';
            }, 1500);
        });
    }
}

// Enhance hearts animation
function initHeartsAnimation() {
    const hearts = document.querySelectorAll('.floating-heart, .heart, .broken-heart');
    
    hearts.forEach((heart, index) => {
        // Randomize animation slightly
        const duration = 4 + Math.random() * 4;
        const delay = Math.random() * 5;
        
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        // Random size for some hearts
        if (Math.random() > 0.5) {
            const size = 1 + Math.random() * 2;
            heart.style.fontSize = `${size}rem`;
        }
    });
}

// Confetti animation enhancement
function initConfettiAnimation() {
    const confettiPieces = document.querySelectorAll('.confetti-piece');
    
    confettiPieces.forEach((piece, index) => {
        // Randomize animation
        const duration = 3 + Math.random() * 4;
        const delay = Math.random() * 5;
        
        piece.style.animationDuration = `${duration}s`;
        piece.style.animationDelay = `${delay}s`;
        
        // Random shape
        if (Math.random() > 0.5) {
            piece.style.borderRadius = '50%';
        }
        
        // Random width/height
        const size = 5 + Math.random() * 15;
        piece.style.width = `${size}px`;
        piece.style.height = `${size}px`;
    });
}

// Rain animation enhancement
function initRainAnimation() {
    const drops = document.querySelectorAll('.drop');
    
    drops.forEach((drop, index) => {
        // Randomize animation
        const duration = 1.5 + Math.random() * 1;
        const delay = Math.random() * 2;
        
        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${delay}s`;
        
        // Random length
        const length = 30 + Math.random() * 40;
        drop.style.height = `${length}px`;
        
        // Random opacity
        const opacity = 0.3 + Math.random() * 0.4;
        drop.style.opacity = opacity;
    });
}

// Ripple effect for buttons
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
    `;
    
    // Add overflow hidden to button if not already
    if (window.getComputedStyle(button).position === 'static') {
        button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Special effect for the "No" page - make the please button more appealing
function enhancePleaseButton() {
    const pleaseBtn = document.querySelector('.please-btn');
    
    if (pleaseBtn && window.location.pathname.includes('no.html')) {
        // Make it pulse gently
        pleaseBtn.style.animation = 'heartbeat 1.5s infinite';
        
        // Add floating effect
        setInterval(() => {
            pleaseBtn.style.transform = `translateY(${Math.sin(Date.now() / 500) * 5}px)`;
        }, 50);
    }
}

// Call special enhancements
setTimeout(() => {
    enhancePleaseButton();
}, 1000);