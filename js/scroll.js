// Mobile detection function
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
}

// Scroll animation handler for girls section, show buttons, review girls, about image, and gallery foreground
function handleScrollAnimation() {
    const girlsSection = document.querySelector('.girls-section');
    const showButtons = document.querySelector('.show-buttons');
    const reviewGirls = document.querySelector('.review-girls');
    const aboutImgAnimated = document.querySelector('.about-img-animated');
    const galleryForegroundAnimated = document.querySelector('.gallery-foreground-animated');

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

    // Handle review girls spinning animation
    if (reviewGirls) {
        const triggerElement = document.getElementById('trigger-review-animation');
        if (triggerElement) {
            const triggerRect = triggerElement.getBoundingClientRect();
            const triggerTop = triggerRect.top;
            const triggerBottom = triggerRect.bottom;

            // Different trigger thresholds for mobile vs desktop
            const isMobileDevice = isMobile();
            const triggerThreshold = isMobileDevice ? windowHeight * 0.8 : windowHeight * 0.9;

            // Check if trigger element is properly in view
            const triggerInView = triggerTop < triggerThreshold && triggerBottom > (windowHeight - triggerThreshold);

            if (triggerInView && !reviewGirls.classList.contains('spinning')) {
                // Add the spinning class to start the animation
                reviewGirls.classList.add('spinning');
            } else if (!triggerInView && reviewGirls.classList.contains('spinning')) {
                // Remove the spinning class to stop the animation
                reviewGirls.classList.remove('spinning');
            }
        } else {
            // If trigger element doesn't exist, remove spinning class
            if (reviewGirls.classList.contains('spinning')) {
                reviewGirls.classList.remove('spinning');
            }
        }
    }

    // Handle about image animation
    if (aboutImgAnimated) {
        const triggerElement = document.getElementById('trigger-about-animation');
        if (triggerElement) {
            const triggerRect = triggerElement.getBoundingClientRect();
            const triggerTop = triggerRect.top;
            const triggerBottom = triggerRect.bottom;

            // Different trigger thresholds for mobile vs desktop
            const isMobileDevice = isMobile();
            const triggerThreshold = isMobileDevice ? windowHeight * 0.8 : windowHeight * 0.9;
            const endThreshold = isMobileDevice ? windowHeight * 0.5 : windowHeight * 0.4;

            // Check if the trigger element is properly in view
            const triggerInView = triggerTop < triggerThreshold && triggerBottom > (windowHeight - triggerThreshold);

            if (triggerInView) {
                // Calculate when to start animation based on trigger element position
                const startPoint = triggerThreshold;
                const endPoint = endThreshold;

                // Calculate scroll progress for this trigger element
                const aboutScrollProgress = Math.min(Math.max((startPoint - triggerTop) / (startPoint - endPoint), 0), 1);

                // Calculate new bottom position (-400px to 0px)
                const newBottom = -400 + (aboutScrollProgress * 400);

                // Apply the animation
                aboutImgAnimated.style.bottom = `${newBottom}px`;
            } else {
                // Return to original position when trigger element is not in view
                aboutImgAnimated.style.bottom = '-400px';
            }
        } else {
            // If trigger element doesn't exist, keep image in original position
            aboutImgAnimated.style.bottom = '-400px';
        }
    }

    // Handle gallery foreground animation
    if (galleryForegroundAnimated) {
        const triggerElement = document.getElementById('trigger-gallery-animation');
        if (triggerElement) {
            const triggerRect = triggerElement.getBoundingClientRect();
            const triggerTop = triggerRect.top;

            // Check if trigger element is in view (when it's 50% visible)
            const triggerVisible = triggerTop < windowHeight * 0.5;

            if (triggerVisible && !galleryForegroundAnimated.classList.contains('animate')) {
                // Add the animate class to trigger the CSS transition
                galleryForegroundAnimated.classList.add('animate');
            }
        }
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

// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for mobile anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Always account for fixed navbar (60px height)
                    const offsetTop = targetElement.offsetTop - 60;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Smooth scrolling for desktop anchor links
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Always account for fixed navbar (60px height)
                    const offsetTop = targetElement.offsetTop - 60;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

