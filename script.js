// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure footer logo is visible
    const footerLogo = document.getElementById('footer-logo');
    if (footerLogo) {
        footerLogo.style.display = 'block';
        footerLogo.style.visibility = 'visible';
        footerLogo.style.opacity = '1';
        
        // Ensure the logo outline and text are also visible
        const logoOutline = footerLogo.querySelector('.logo-outline');
        const logoText = footerLogo.querySelector('h1');
        
        if (logoOutline) {
            logoOutline.style.display = 'inline-block';
            logoOutline.style.visibility = 'visible';
            logoOutline.style.opacity = '1';
        }
        
        if (logoText) {
            logoText.style.display = 'inline-block';
            logoText.style.visibility = 'visible';
            logoText.style.opacity = '1';
        }
    }

    // Mobile menu functionality - ensure this works properly
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.querySelector('.main-nav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileNavLinks = document.querySelectorAll('.main-nav ul li a');
    
    // Toggle mobile menu
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Toggle between hamburger and close icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                mobileOverlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close mobile menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            mainNav.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 767) {
                mainNav.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Add scroll event listener for header background
    const header = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(13, 44, 107, 0.95)';
        } else {
            header.style.backgroundColor = 'var(--nav-blue)';
        }
    });

    // Add play button functionality
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // This would typically play a video
            // For now, just show an alert
            alert('Video would play here in the final implementation');
        });
    });

    // Add hover effects to monster cards
    const monsterCards = document.querySelectorAll('.monster-card');
    
    monsterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Gallery modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');

    // Ensure all gallery items are visible
    galleryItems.forEach((item, index) => {
        // Force display for all items, especially the 9th one
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.visibility = 'visible';
        
        // Ensure the image inside is also properly displayed
        const img = item.querySelector('img');
        if (img) {
            img.style.display = 'block';
            // Preload image to ensure it's loaded
            const preloadImg = new Image();
            preloadImg.src = img.src;
        }
        
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgCaption = this.querySelector('.gallery-overlay h3').textContent;
            
            modalImage.src = imgSrc;
            modalCaption.textContent = imgCaption;
            galleryModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });

    modalClose.addEventListener('click', function() {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside the image
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryModal.style.display === 'flex') {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Scroll-based animations
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right');
    
    function checkScroll() {
        animateOnScrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check on page load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Add tilt effect to gallery items for extra wow factor
    if (window.innerWidth > 768) {
        galleryItems.forEach(item => {
            item.addEventListener('mousemove', function(e) {
                const boundingRect = this.getBoundingClientRect();
                const mouseX = e.clientX - boundingRect.left;
                const mouseY = e.clientY - boundingRect.top;
                
                const xRotation = ((mouseY / boundingRect.height) - 0.5) * -10;
                const yRotation = ((mouseX / boundingRect.width) - 0.5) * 10;
                
                this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}); 