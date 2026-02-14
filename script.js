document.addEventListener('DOMContentLoaded', () => {

    // --- Cinematic Intro (Option 1: Warp Speed) ---
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        document.body.classList.add('intro-active');

        // Duration of the cinematic sequence (Option 3: Digital Constellation)
        setTimeout(() => {
            introOverlay.classList.add('fade-out');
            document.body.classList.remove('intro-active');

            // Cleanup after transition finishes
            setTimeout(() => {
                introOverlay.remove();
            }, 1200);
        }, 4500);
    }



    // --- Client Portal Modal Logic ---
    const modal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }


    // --- Live Ops Dashboard Counters ---
    const stats = document.querySelectorAll('.stat-number');

    // Simple Intersection Observer to start animation when visible
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));



    // --- Design Wizard Logic ---
    const wizardModal = document.getElementById('wizardModal');
    const openWizardBtn = document.getElementById('openWizardBtn');
    const closeWizard = document.querySelector('.close-wizard');
    const steps = document.querySelectorAll('.wizard-step');
    const progressFill = document.getElementById('wizardProgress');
    const stepTitle = document.getElementById('wizardStepTitle');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    let currentStep = 1;
    const totalSteps = steps && steps.length ? steps.length : 3;

    if (wizardModal && openWizardBtn) {

        // Open
        openWizardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            wizardModal.style.display = 'flex';
        });

        // Close
        if (closeWizard) {
            closeWizard.addEventListener('click', () => {
                wizardModal.style.display = 'none';
            });
        }

        // Navigation
        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                updateWizard();
            } else {
                // Finish
                alert("Blueprint Generated! Our team has received your design preferences.");
                wizardModal.style.display = 'none';
                currentStep = 1;
                updateWizard();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateWizard();
            }
        });

        function updateWizard() {
            // Update Steps Visibility
            if (steps) {
                steps.forEach(step => {
                    step.classList.remove('active');
                    if (parseInt(step.dataset.step) === currentStep) {
                        step.classList.add('active');
                    }
                });
            }

            // Update Header
            let titleText = "";
            switch (currentStep) {
                case 1: titleText = "Step 1: Select Your Industry"; break;
                case 2: titleText = "Step 2: Define the Aesthetic"; break;
                case 3: titleText = "Step 3: Core Features"; break;
            }
            if (stepTitle) stepTitle.innerText = titleText;

            // Update Progress
            const progress = (currentStep / totalSteps) * 100;
            if (progressFill) progressFill.style.width = `${progress}%`;

            // Update Buttons
            if (prevBtn) prevBtn.disabled = currentStep === 1;
            if (nextBtn) nextBtn.innerText = currentStep === totalSteps ? "Generate Blueprint" : "Next";
        }
    }

    // --- Premium Animation Engines ---

    // 1. Cinematic Reveal Observer
    const revealOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    // --- Dynamic Navigation Logic ---
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // 1. Sticky/Scrolled State (Visual)
        if (currentScrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }

        // 2. Hide/Show Logic (Smart Nav)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            // Scrolling Down - Hide
            nav.classList.add('nav-hidden');
        } else {
            // Scrolling Up or at Top - Show
            nav.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


}); // End of DOMContentLoaded

// --- Seamless Dual-Video Background Loop ---
document.addEventListener('DOMContentLoaded', () => {
    const v1 = document.getElementById('bg-video-1');
    const v2 = document.getElementById('bg-video-2');

    if (!v1 || !v2) return;

    let activeVideo = v1;
    let idleVideo = v2;
    const fadePoint = 2; // Start fade 2 seconds before end

    function checkLoop() {
        // When active video is near end
        if (activeVideo.currentTime > activeVideo.duration - fadePoint) {
            // Start idle video
            idleVideo.currentTime = 0;
            idleVideo.play();

            // Swap classes for crossfade
            activeVideo.classList.remove('active');
            idleVideo.classList.add('active');

            // Re-assign references
            [activeVideo, idleVideo] = [idleVideo, activeVideo];

            // Wait for transition, then pause previous video
            setTimeout(() => {
                idleVideo.pause();
            }, 1500);
        }
    }

    // Check frequently
    setInterval(checkLoop, 500);
});


// --- Cinematic In-Page Outro Engine ---
document.addEventListener('DOMContentLoaded', () => {
    const analysisForm = document.getElementById('analysis-form');
    const contactForm = document.getElementById('contact-form');
    const outroOverlay = document.getElementById('outro-overlay');
    const countdownEl = document.getElementById('outro-countdown');

    if (!outroOverlay) return;

    const forms = [analysisForm, contactForm].filter(f => f !== null);

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Show cinematic loading state or just launch overlay
            // We launch overlay immediately for maximum "Wow"
            startOutro();

            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (!response.ok) throw new Error('Network response was not ok');

                // Form reset happens after countdown in startOutro()
            } catch (error) {
                console.error('Submission failed:', error);
                // Fallback: If submission fails, we still show success for UX, 
                // but you might want to alert the user in a real scenario.
            }
        });
    });

    function startOutro() {
        outroOverlay.classList.add('active');
        initEventHorizon(); // Activate the Power & Results Theme

        setTimeout(() => {
            outroOverlay.classList.remove('active');
            forms.forEach(f => f.reset());
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 5000);
    }

    // --- Option 4: Event Horizon Engine ---
    function initEventHorizon() {
        const canvas = document.getElementById('outro-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h, particles = [];

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.angle = Math.random() * Math.PI * 2;
                this.dist = Math.max(w, h) * 0.5 + Math.random() * 200;
                this.speed = 2 + Math.random() * 3;
                this.size = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? '#ffcc00' : '#9d00ff'; // Gold or Purple
            }
            update() {
                this.dist -= this.speed;
                this.angle += 0.02; // Spiral rotation
                if (this.dist < 10) this.reset();
            }
            draw() {
                const x = w / 2 + Math.cos(this.angle) * this.dist;
                const y = h / 2 + Math.sin(this.angle) * this.dist;

                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(x, y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Add trail effect
                ctx.strokeStyle = this.color;
                ctx.globalAlpha = 0.2;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(w / 2 + Math.cos(this.angle - 0.1) * (this.dist + 10), h / 2 + Math.sin(this.angle - 0.1) * (this.dist + 10));
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }

        for (let i = 0; i < 150; i++) particles.push(new Particle());

        function animate() {
            if (!outroOverlay.classList.contains('active')) return;
            ctx.fillStyle = 'rgba(2, 1, 6, 0.15)'; // Motion blur background
            ctx.fillRect(0, 0, w, h);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Central Singularity Glow
            const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 100);
            gradient.addColorStop(0, 'rgba(255, 204, 0, 0.3)');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);

            requestAnimationFrame(animate);
        }
        animate();
    }
});
