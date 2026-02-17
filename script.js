document.addEventListener('DOMContentLoaded', () => {
    // --- Boot Sequence Logic ---
    const bootScreen = document.getElementById('boot-screen');
    const appContainer = document.getElementById('app-container');
    const loadingDots = document.getElementById('loading-dots');
    const bootMessage = document.getElementById('boot-message');

    let dotsInterval = setInterval(() => {
        if (loadingDots.innerText.length < 3) {
            loadingDots.innerText += '.';
        } else {
            loadingDots.innerText = '';
        }
    }, 500);

    setTimeout(() => {
        bootMessage.innerText = "> SYSTEM_READY. INITIALIZING UI...";
    }, 2000);

    setTimeout(() => {
        clearInterval(dotsInterval);
        bootScreen.style.display = 'none';
        appContainer.classList.remove('hidden');
        startUptimeCounter();
    }, 3500);


    // --- Navigation Logic ---
    const navBtns = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all btns and views
            navBtns.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            // Add active class to clicked btn
            btn.classList.add('active');

            // Show target view
            const targetId = `view-${btn.dataset.target}`;
            document.getElementById(targetId).classList.add('active');
        });
    });


    // --- Uptime Counter ---
    function startUptimeCounter() {
        const uptimeEl = document.getElementById('uptime');
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
            uptimeEl.innerText = `UPTIME: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }, 1000);
    }

    function pad(val) {
        return val < 10 ? '0' + val : val;
    }


    // --- Terminal Logic ---
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    if (terminalInput) {
        terminalInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                this.value = ''; // Clear input

                // Echo command
                printToTerminal(`C:\\Users\\HardipSingh> ${command}`);

                // Process command
                processCommand(command);
            }
        });
    }

    function printToTerminal(text) {
        const p = document.createElement('p');
        p.textContent = text;
        terminalOutput.appendChild(p);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function processCommand(cmd) {
        let response = "";

        switch (cmd) {
            case 'help':
                response = `
                AVAILABLE COMMANDS:
                -------------------
                about       - Display user bio
                skills      - List technical skills
                projects    - List key projects
                contact     - Show contact info
                clear       - Clear terminal screen
                `;
                break;
            case 'about':
                response = "Hardip Singh: IT Infrastructure Specialist & Cloud Solutions Architect. Experiened in Azure, O365, and Virtualization.";
                break;
            case 'skills':
                response = "SKILLS: Azure, Entra ID, Intune, Exchange, WatchGuard, Cisco, VMware, Hyper-V, Powershell.";
                break;
            case 'projects':
                response = "PROJECTS: SharePoint Migrations, Security Hardening (MFA/Zero Trust), Disaster Recovery Implementation.";
                break;
            case 'contact':
                response = "EMAIL: Shardip45@gmail.com | PHONE: (778)-917-3800";
                break;
            case 'clear':
                terminalOutput.innerHTML = "";
                return; // Don't print response
            case '':
                return;
            default:
                response = `'${cmd}' is not recognized as an internal or external command. Type 'help' for options.`;
        }

        printToTerminal(response);
        printToTerminal(""); // Empty line for spacing
    }
});
