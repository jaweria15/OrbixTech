document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- Swiper Initialization ---
    if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Setup variables
            let submitBtn = contactForm.querySelector('button');
            let originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send';
            
            if (submitBtn) {
                submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin right"></i>';
                submitBtn.disabled = true;
            }

            // Mock submission
            setTimeout(() => {
                formStatus.innerHTML = '<span style="color: #4caf50;"><i class="fas fa-check-circle"></i> Message sent successfully! We will get back to you soon.</span>';
                contactForm.reset();

                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }

                // Hide message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }, 1500);
        });
    }

    // --- View More Services Logic ---
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const viewMoreContainer = document.getElementById('viewMoreContainer');
    const hiddenServices = document.querySelectorAll('.hidden-service');

    if (viewMoreBtn && hiddenServices.length > 0) {
        viewMoreBtn.addEventListener('click', () => {
            hiddenServices.forEach(card => {
                card.classList.remove('hidden-service');
            });
            if (viewMoreContainer) {
                viewMoreContainer.style.display = 'none';
            }
        });
    }
});