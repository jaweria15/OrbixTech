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
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Setup variables
            let submitBtn = contactForm.querySelector('button');
            let originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send';

            if (submitBtn) {
                submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin ml-2"></i>';
                submitBtn.disabled = true;
            }

            // Web3Forms Integration (Free Email Service)
            const formData = new FormData(contactForm);

            // IMPORTANT: Get your free Access Key at https://web3forms.com using your email address
            // Replace "YOUR_ACCESS_KEY_HERE" with that actual key.
            formData.append("access_key", "405dbbac-c38f-4299-a1db-c174acaf4eb2");

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    formStatus.innerHTML = '<span style="color: #4caf50;"><i class="fas fa-check-circle"></i> Message sent successfully! We will get back to you soon.</span>';
                    contactForm.reset();
                } else {
                    formStatus.innerHTML = '<span style="color: #f44336;"><i class="fas fa-exclamation-circle"></i> Error: ' + data.message + '</span>';
                }
            } catch (error) {
                formStatus.innerHTML = '<span style="color: #f44336;"><i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please check your connection.</span>';
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }

                // Hide message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }
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