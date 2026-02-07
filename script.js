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

    // --- Cost Calculator Logic ---
    const calcOptions = document.querySelectorAll('.calc-option input[type="checkbox"]');
    const totalSetupEl = document.getElementById('totalSetup');
    const totalMonthlyEl = document.getElementById('totalMonthly');
    const monthlyWrapper = document.getElementById('monthlyWrapper');
    const summaryTextEl = document.getElementById('summeryText');

    if (calcOptions.length > 0) {
        calcOptions.forEach(option => {
            option.addEventListener('change', updateCalculator);
        });
    }

    function updateCalculator() {
        let setupTotal = 0;
        let monthlyTotal = 0;
        let selectedLabels = [];

        calcOptions.forEach(option => {
            if (option.checked) {
                const val = parseInt(option.value);
                const isRecurring = option.getAttribute('data-recurring') === 'true';

                if (isRecurring) {
                    monthlyTotal += val;
                } else {
                    setupTotal += val;
                }
                selectedLabels.push(option.getAttribute('data-label'));
            }
        });

        // Animation for numbers
        if (totalSetupEl) animateValue(totalSetupEl, parseInt(totalSetupEl.innerText.replace(/,/g, '')), setupTotal, 500);
        if (totalMonthlyEl) animateValue(totalMonthlyEl, parseInt(totalMonthlyEl.innerText.replace(/,/g, '')), monthlyTotal, 500);

        // Show/Hide Monthly Result
        if (monthlyWrapper) {
            monthlyWrapper.style.display = monthlyTotal > 0 ? 'block' : 'none';
        }

        // Update summary text
        if (selectedLabels.length > 0) {
            summaryTextEl.textContent = selectedLabels.join(', ');
            summaryTextEl.style.color = "#fff";
        } else {
            summaryTextEl.textContent = "Select items...";
            summaryTextEl.style.color = "#666";
        }
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
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

    // --- Health Check Widget ---
    const analyzeBtn = document.querySelector('.health-check-widget button');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            const input = document.querySelector('.health-check-widget input');
            if (input.value.length > 3) {
                alert(`Analyzing ${input.value}...\n\nDiagnostic Started. Our team will contact you with a full report.`);
                input.value = '';
            } else {
                alert('Please enter a valid URL.');
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


    // --- AI Concierge Logic ---
    const aiBtn = document.getElementById('aiBtn');
    const aiWindow = document.getElementById('aiWindow');
    const closeAi = document.getElementById('closeAi');
    const chatBody = document.getElementById('chatBody');

    if (aiBtn && aiWindow) {
        aiBtn.addEventListener('click', () => {
            aiWindow.style.display = aiWindow.style.display === 'flex' ? 'none' : 'flex';
        });

        closeAi.addEventListener('click', () => {
            aiWindow.style.display = 'none';
        });

        window.sendMsg = function (msgText) {
            // User Message
            const userDiv = document.createElement('div');
            userDiv.classList.add('msg', 'user');
            userDiv.innerHTML = `<p>${msgText}</p>`;
            chatBody.appendChild(userDiv);
            chatBody.scrollTop = chatBody.scrollHeight;

            // Simulated AI Delay
            setTimeout(() => {
                let replyText = "";
                if (msgText.includes("Pricing")) replyText = "Our professional websites start at just 120 JOD. We offer custom design, fast delivery, and 24/7 monitoring to fit your budget.";
                else if (msgText.includes("NexTech")) replyText = "NexTech is a premium digital agency. We build, buy, and sell professional high-performance websites.";
                else replyText = "I've flagged this for a human agent. Please use the 'Start Project' form for detailed inquiries.";

                const botDiv = document.createElement('div');
                botDiv.classList.add('msg', 'bot');
                botDiv.innerHTML = `<p>${replyText}</p>`;
                chatBody.appendChild(botDiv);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 800);
        };
    }

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

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 2. 3D Tilt Interaction
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });

    // 3. Deep Space Parallax & Sticky Nav
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;

        // Sticky Nav Effect
        if (nav) {
            // Scroll direction logic
            if (scrolled > lastScroll && scrolled > 100) {
                // Scrolling Down - Hide Nav
                nav.classList.add('nav-hidden');
            } else {
                // Scrolling Up - Show Nav
                nav.classList.remove('nav-hidden');
            }

            if (scrolled > 50) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        }

        lastScroll = scrolled <= 0 ? 0 : scrolled; // For Mobile or negative scrolling

        // Background moves slower
        const galaxyBg = document.getElementById('galaxy-bg');
        if (galaxyBg) {
            galaxyBg.style.transform = `rotate(${10 + scrolled * 0.05}deg) scale(${1.1 + scrolled * 0.0001}) translateY(${scrolled * 0.2}px)`;
        }
    });

    // --- Data Transfer: Estimator to Contact Form ---
    const lockQuoteBtn = document.getElementById('lockQuoteBtn');
    const contactMessage = document.getElementById('contactMessage');

    if (lockQuoteBtn && contactMessage) {
        lockQuoteBtn.addEventListener('click', () => {
            const summaryTextEl = document.getElementById('summeryText');
            const totalSetupEl = document.getElementById('totalSetup');
            const totalMonthlyEl = document.getElementById('totalMonthly');
            const monthlyWrapper = document.getElementById('monthlyWrapper');
            const serviceSelect = document.querySelector('select[name="service_type"]');
            const budgetSelect = document.querySelector('select[name="budget"]');

            if (!summaryTextEl || summaryTextEl.innerText === "Select items...") return;

            const summaryText = summaryTextEl.innerText;
            const setupTotal = totalSetupEl ? parseInt(totalSetupEl.innerText.replace(/,/g, '')) : 0;
            const monthlyTotal = totalMonthlyEl ? parseInt(totalMonthlyEl.innerText.replace(/,/g, '')) : 0;
            const isMonthlyActive = monthlyWrapper && monthlyWrapper.style.display !== 'none';

            // 1. Auto-fill Textarea
            let message = `Requested Services: ${summaryText}\n`;
            message += `Estimated Setup: ${setupTotal} JOD\n`;
            if (isMonthlyActive) {
                message += `Estimated Monthly: ${monthlyTotal} JOD / Month\n`;
            }
            message += `\nAdditional Goals: `;
            contactMessage.value = message;

            // 2. Auto-select Service Type (Pick the highest tier selected)
            if (serviceSelect) {
                if (summaryText.includes("Online Store")) serviceSelect.value = "Online Store / Shop";
                else if (summaryText.includes("Business Website")) serviceSelect.value = "Business Website (CMS)";
                else if (summaryText.includes("Professional Portfolio")) serviceSelect.value = "Professional Portfolio";
                else if (summaryText.includes("Logo & Brand")) serviceSelect.value = "Brand Identity";
            }

            // 3. Auto-select Budget Range
            if (budgetSelect) {
                const totalInvest = setupTotal + (isMonthlyActive ? monthlyTotal : 0);
                if (totalInvest < 250) budgetSelect.value = "100 JOD - 250 JOD";
                else if (totalInvest < 500) budgetSelect.value = "250 JOD - 500 JOD";
                else if (totalInvest < 1000) budgetSelect.value = "500 JOD - 1,000 JOD";
                else budgetSelect.value = "1,000 JOD+";
            }

            // Highlight text area to show it worked
            contactMessage.focus();
            contactMessage.style.borderColor = 'var(--accent-violet)';
            contactMessage.style.boxShadow = '0 0 15px var(--accent-violet)';
            setTimeout(() => {
                contactMessage.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                contactMessage.style.boxShadow = 'none';
            }, 2000);
        });
    }

});
