/* =========================================================
   PORTFOLIO - Edit Mode Script
   - Click Edit Mode button, then click any text to edit
   - Changes saved in browser (localStorage) automatically
   ========================================================= */

// ===== Default Data (apni info yahan bhi daal sakte ho) =====
const defaultData = {
    name: "Muhammad Rizwan",
    role: "Web Developer",
    tagline: "I build beautiful, responsive websites that help businesses grow online.",
    about: "Write your introduction here. Tell visitors who you are, what you do, and what makes you unique. This section is fully editable in Edit Mode.",
    email: "rizwanullahmxeed@gmail.com",
    email2: "rizwanullahmxeed@gmail.com",
    location: "KPK Dera Ismail Khan",
    experience: "2+ Years",
    freelance: "Available",
    phone: "+92 3370653105",
    contactText: "Have a project in mind? Let's talk! Fill out the form or reach me directly."
};

const defaultSkills = [
    { name: "HTML & CSS", level: 90 },
    { name: "JavaScript", level: 70 },
    { name: "React", level: 60 },
    { name: "Python", level: 75 },
    { name: "Node.js", level: 65 },
    { name: "UI/UX Design", level: 70 }
];

const defaultProjects = [
    {
        title: "E-commerce Website",
        desc: "A full-featured online store with cart, payment gateway, and admin panel.",
        icon: "🛒",
        link: "#",
        demo: "#"
    },
    {
        title: "Weather App",
        desc: "Real-time weather app using a public API with geolocation support.",
        icon: "🌦️",
        link: "#",
        demo: "#"
    },
    {
        title: "Task Manager",
        desc: "A productivity app to organize daily tasks with drag-and-drop support.",
        icon: "✅",
        link: "#",
        demo: "#"
    }
];

const defaultTimeline = [
    {
        title: "B.Tech in Computer Science",
        org: "Gomal University D I Khan",
        date: "2022 - 2026",
        desc: "Graduated with distinction. Focused on web development and data structures."
    },
    {
        title: "Web Developer Intern",
        org: "Your Company Name",
        date: "2026 - 2027",
        desc: "Built responsive web applications and improved website performance by 40%."
    },
    {
        title: "Freelance Developer",
        org: "Self-employed",
        date: "2026 - Present",
        desc: "Working with clients worldwide on web development and design projects."
    }
];

// ===== Helpers =====
function loadData() {
    try {
        return JSON.parse(localStorage.getItem('portfolioData')) || defaultData;
    } catch {
        return defaultData;
    }
}

function loadSkills() {
    try {
        return JSON.parse(localStorage.getItem('portfolioSkills')) || defaultSkills;
    } catch {
        return defaultSkills;
    }
}

function loadProjects() {
    try {
        return JSON.parse(localStorage.getItem('portfolioProjects')) || defaultProjects;
    } catch {
        return defaultProjects;
    }
}

function loadTimeline() {
    try {
        return JSON.parse(localStorage.getItem('portfolioTimeline')) || defaultTimeline;
    } catch {
        return defaultTimeline;
    }
}

const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// ===== Fill text fields from saved data =====
function applyTextData() {
    const data = loadData();
    document.querySelectorAll('[data-field]').forEach(el => {
        const field = el.dataset.field;
        if (data[field] !== undefined) {
            el.textContent = data[field];
        }
    });
}

// ===== Render Skills =====
function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    grid.innerHTML = loadSkills().map(skill => `
        <div class="skill-card">
            <div class="skill-name">
                <span>${skill.name}</span>
                <span>${skill.level}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" data-level="${skill.level}"></div>
            </div>
        </div>
    `).join('');

    // Animate progress bars on scroll
    setTimeout(() => {
        grid.querySelectorAll('.progress-fill').forEach(fill => {
            fill.style.width = fill.dataset.level + '%';
        });
    }, 300);
}

// ===== Render Projects =====
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = loadProjects().map((p, i) => `
        <div class="project-card">
            <div class="project-image">${p.icon}</div>
            <div class="project-body">
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <div class="project-links">
                    <a href="${p.link}" target="_blank"><i class="fas fa-code"></i> Code</a>
                    <a href="${p.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== Render Timeline =====
function renderTimeline() {
    const tl = document.getElementById('timeline');
    tl.innerHTML = loadTimeline().map(item => `
        <div class="timeline-item">
            <h3>${item.title}</h3>
            <span class="timeline-date">${item.org} • ${item.date}</span>
            <p>${item.desc}</p>
        </div>
    `).join('');
}

// ===== Edit Mode =====
let editMode = false;

function toggleEditMode() {
    editMode = !editMode;
    document.body.classList.toggle('edit-mode', editMode);

    document.querySelectorAll('[data-field]').forEach(el => {
        if (editMode) {
            el.contentEditable = 'true';
            el.spellcheck = false;
            el.classList.add('editable-mark');
            // Auto-save on input
            el.addEventListener('input', () => {
                const data = loadData();
                data[el.dataset.field] = el.textContent.trim();
                save('portfolioData', data);
            });
        } else {
            el.contentEditable = 'false';
            el.classList.remove('editable-mark');
        }
    });

    document.getElementById('editPanel').classList.toggle('show', editMode);
    document.getElementById('editBtn').textContent = editMode ? '✓ Done' : '✏️ Edit Mode';

    showToast(editMode ? 'Edit Mode ON — text par click karke type karo' : 'Changes saved!');
}

// ===== Toast =====
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== Reset =====
function resetAll() {
    if (confirm('Kya aap pakka default data restore karna chahte ho? Aapke changes delete ho jayenge.')) {
        localStorage.removeItem('portfolioData');
        localStorage.removeItem('portfolioSkills');
        localStorage.removeItem('portfolioProjects');
        localStorage.removeItem('portfolioTimeline');
        location.reload();
    }
}

// ===== Social links & Resume =====
function setupSocials() {
    const socials = {
        github: 'https://github.com/7d1bc00316f0dd6365f69cf1694b4b9e79e106df',
        linkedin: 'https://linkedin.com/in/yourusername',
        twitter: 'https://twitter.com/yourusername',
        instagram: 'https://instagram.com/yourusername'
    };

    const saved = JSON.parse(localStorage.getItem('portfolioSocials') || '{}');

    document.querySelectorAll('[data-social]').forEach(a => {
        a.href = saved[a.dataset.social] || socials[a.dataset.social];
    });

    document.getElementById('resumeBtn').addEventListener('click', (e) => {
        e.preventDefault();
        const url = JSON.parse(localStorage.getItem('portfolioSocials') || '{}').resume
            || '/CV.html';
        window.open(url, '_blank');
    });
}

// ===== Mobile menu =====
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
}

// ===== Contact form =====
function setupContactForm() {
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        e.target.reset();
        showToast('✅ Message sent successfully! (Demo — form ko backend se connect karna hoga)');
    });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    applyTextData();
    renderSkills();
    renderProjects();
    renderTimeline();
    setupSocials();
    setupMobileMenu();
    setupContactForm();

    // Edit mode buttons
    document.getElementById('editBtn').addEventListener('click', toggleEditMode);
    document.getElementById('closeEditBtn').addEventListener('click', toggleEditMode);
    document.getElementById('saveBtn').addEventListener('click', () => {
        if (editMode) toggleEditMode();
        showToast('💾 Sab kuch save ho gaya!');
    });
    document.getElementById('resetBtn').addEventListener('click', resetAll);
});