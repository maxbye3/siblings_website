// Mobile detection function
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
}

// Scroll animation handler for girls section and show buttons
function handleScrollAnimation() {
    const girlsSection = document.querySelector('.girls-section');
    const showButtons = document.querySelector('.show-buttons');

    if (!girlsSection) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    // Start animation immediately when scrolling begins
    // Animate over a shorter distance for more responsive feel
    const animationDistance = windowHeight * 0.5; // Animate over half the viewport height

    // Calculate scroll progress (0 to 1)
    const scrollProgress = Math.min(Math.max(scrollTop / animationDistance, 0), 1);

    // Calculate new bottom position (-300px to 0px)
    const newBottom = -300 + (scrollProgress * 300);

    // Apply the new position
    girlsSection.style.bottom = newBottom + 'px';

    // Handle show buttons fade effect (not on mobile devices)
    if (showButtons && !isMobile()) {
        // Calculate fade based on scroll distance from top
        const fadeDistance = windowHeight * 0.3; // Start fading after 30% of viewport height
        const fadeProgress = Math.min(scrollTop / fadeDistance, 1);

        // Fade to 0.5 opacity as user scrolls
        const opacity = 1 - (fadeProgress * 0.5); // Goes from 1 to 0.5
        showButtons.style.opacity = opacity;
    } else if (showButtons && isMobile()) {
        // Keep buttons fully visible on mobile devices
        showButtons.style.opacity = 1;
    }
}

// Throttle scroll events for better performance
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(handleScrollAnimation);
        ticking = true;
    }
}

function onScroll() {
    ticking = false;
    requestTick();
}

// Add scroll event listener
window.addEventListener('scroll', onScroll);

// Check on page load
document.addEventListener('DOMContentLoaded', handleScrollAnimation);
