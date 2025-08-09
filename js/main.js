document.addEventListener('DOMContentLoaded', function() {
    // Function to load HTML into container
    function loadComponent(file, containerId) {
        fetch(file)
            .then(response => response.text())
            .then(html => {
                document.getElementById(containerId).innerHTML = html;
            })
            .catch(err => console.error(`Error loading ${file}:`, err));
    }

    // Load all components
    loadComponent('components/header.html', 'header-container');
    loadComponent('components/navigation.html', 'nav-container');
    loadComponent('components/footer.html', 'footer-container');
});
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add animation on scroll for trust indicators
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe trust items
        document.querySelectorAll('.trust-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });

        // City cards animation
        document.querySelectorAll('.city-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // CTA button interactions
        document.querySelectorAll('.cta-button, .primary-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255,255,255,0.5)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.pointerEvents = 'none';
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .hero-visual {
                animation: float 3s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { 
                    transform: translateY(0px) rotate(0deg); 
                }
                50% { 
                    transform: translateY(-20px) rotate(5deg); 
                }
            }
            
            /* Loading animation for page elements */
            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                animation: fadeInUp 0.8s ease forwards;
            }
            
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        // Add loading animations to elements
        window.addEventListener('load', () => {
            document.querySelectorAll('.hero-content > *').forEach((element, index) => {
                element.style.animationDelay = `${index * 0.2}s`;
                element.classList.add('fade-in');
            });
        });

        // Mobile menu toggle (for future implementation)
        const createMobileMenu = () => {
            if (window.innerWidth <= 768) {
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && !document.querySelector('.mobile-menu-toggle')) {
                    const menuToggle = document.createElement('button');
                    menuToggle.innerHTML = '☰';
                    menuToggle.className = 'mobile-menu-toggle';
                    menuToggle.style.cssText = `
                        display: block;
                        background: none;
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                        padding: 0.5rem;
                    `;
                    
                    menuToggle.addEventListener('click', () => {
                        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                        navLinks.style.position = 'absolute';
                        navLinks.style.top = '100%';
                        navLinks.style.left = '0';
                        navLinks.style.width = '100%';
                        navLinks.style.background = 'rgba(102, 126, 234, 0.95)';
                        navLinks.style.flexDirection = 'column';
                        navLinks.style.padding = '1rem';
                        navLinks.style.zIndex = '1000';
                    });
                    
                    document.querySelector('.nav-container').appendChild(menuToggle);
                }
            }
        };

        window.addEventListener('resize', createMobileMenu);
        createMobileMenu();

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            const heroContent = document.querySelector('.hero-content');
            
            if (heroVisual && heroContent) {
                heroVisual.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.02}deg)`;
                heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });

        // Add countdown timer for promotions (example)
        const addCountdownTimer = () => {
            const ctaSection = document.querySelector('.final-cta .cta-content');
            if (ctaSection) {
                const timerDiv = document.createElement('div');
                timerDiv.innerHTML = `
                    <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 10px; margin: 1rem 0; backdrop-filter: blur(10px);">
                        <p style="margin-bottom: 0.5rem; font-weight: bold;">🎉 Early Bird Offer Ends In:</p>
                        <div id="countdown" style="font-size: 1.5rem; font-weight: bold;"></div>
                    </div>
                `;
                ctaSection.insertBefore(timerDiv, ctaSection.querySelector('.hero-actions'));
                
                // Simple countdown (30 days from now)
                const countdownDate = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
                
                const updateCountdown = () => {
                    const now = new Date().getTime();
                    const distance = countdownDate - now;
                    
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    
                    const countdownElement = document.getElementById('countdown');
                    if (countdownElement) {
                        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                    }
                    
                    if (distance < 0) {
                        countdownElement.innerHTML = "Offer Ended!";
                    }
                };
                
                updateCountdown();
                setInterval(updateCountdown, 1000);
            }
        };

        // Initialize countdown after page load
        setTimeout(addCountdownTimer, 1000);

        // Form submission handling (for future forms)
        const handleFormSubmission = (formSelector) => {
            const form = document.querySelector(formSelector);
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    // Show loading state
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Processing...';
                    submitBtn.disabled = true;
                    
                    // Simulate API call
                    setTimeout(() => {
                        // Show success message
                        const successMsg = document.createElement('div');
                        successMsg.innerHTML = `
                            <div style="background: #4ecdc4; color: white; padding: 1rem; border-radius: 5px; margin: 1rem 0; text-align: center;">
                                ✅ Thank you! We'll contact you within 24 hours.
                            </div>
                        `;
                        form.appendChild(successMsg);
                        
                        // Reset form and button
                        form.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        
                        // Remove success message after 5 seconds
                        setTimeout(() => {
                            successMsg.remove();
                        }, 5000);
                    }, 2000);
                });
            }
        };

        // Add floating WhatsApp button
        const addWhatsAppButton = () => {
            const whatsappBtn = document.createElement('a');
            whatsappBtn.href = 'https://wa.me/919876543210?text=Hi! I want to know more about Parents Day Out services.';
            whatsappBtn.target = '_blank';
            whatsappBtn.innerHTML = '💬';
            whatsappBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                background: #25d366;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                text-decoration: none;
                box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
                z-index: 1000;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                animation: pulse 2s infinite;
            `;
            
            whatsappBtn.addEventListener('mouseenter', () => {
                whatsappBtn.style.transform = 'scale(1.1)';
                whatsappBtn.style.boxShadow = '0 6px 25px rgba(37, 211, 102, 0.4)';
            });
            
            whatsappBtn.addEventListener('mouseleave', () => {
                whatsappBtn.style.transform = 'scale(1)';
                whatsappBtn.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.3)';
            });
            
            document.body.appendChild(whatsappBtn);
            
            // Add pulse animation
            const pulseStyle = document.createElement('style');
            pulseStyle.textContent = `
                @keyframes pulse {
                    0% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3); }
                    50% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.6), 0 0 0 10px rgba(37, 211, 102, 0.1); }
                    100% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3); }
                }
            `;
            document.head.appendChild(pulseStyle);
        };

        // Add WhatsApp button after page loads
        setTimeout(addWhatsAppButton, 2000);

        console.log('🎉 Parents Day Out website loaded successfully!');
   
           // Add this to handle component loading
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize components after they load
            const components = document.querySelectorAll('object');
            components.forEach(component => {
                component.addEventListener('load', function() {
                    console.log(`Component ${component.dataset} loaded`);
                    
                    // If you need to run specific code after a component loads
                    if(component.dataset.includes('navigation')) {
                        // Navigation-specific initialization
                    }
                });
            });
        });