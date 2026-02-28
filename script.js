/**
 * Main Scripts for Kavindu Dias Photography
 */

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------
    // Sticky Header
    // --------------------------------------------------------
    const header = document.getElementById('header');
    
    const toggleStickyHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Initial check and scroll event listener
    toggleStickyHeader();
    window.addEventListener('scroll', toggleStickyHeader);

    // --------------------------------------------------------
    // Mobile Navigation Toggle
    // --------------------------------------------------------
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        const isOpen = mainNav.classList.contains('open');
        mainNav.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', !isOpen);
        
        // Morph hamburger icon to cross icon
        if (!isOpen) {
            mobileToggle.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>`;
            document.body.style.overflow = 'hidden'; // prevent scrolling when menu open
        } else {
            mobileToggle.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>`;
            document.body.style.overflow = ''; 
        }
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // --------------------------------------------------------
    // Active Links Updating on Scroll (Spy Scroll)
    // --------------------------------------------------------
    const sections = document.querySelectorAll('section');
    
    const updateActiveLink = () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // if we've scrolled past the section start, adjust for fixed header height
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    // Trigger once on load
    updateActiveLink();

    // --------------------------------------------------------
    // Scroll Animation Observer (Fade In Elements)
    // --------------------------------------------------------
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% is visible
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it has faded in
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

});
