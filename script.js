// Default PowerPoint Lessons
let defaultLessons = [
    { id: 1, title: "سەرەتایەک د ئابووری دا", grade: "10", pptx: "files/grade10-lesson1.pptx" },
    { id: 2, title: "دیاردەیا هەناردەکرن و هاوردەکرنێ", grade: "10", pptx: "files/grade10-lesson2.pptx" },
    { id: 3, title: "ململانێیا بازاڕی و بەرهەم", grade: "11", pptx: "files/grade11-lesson1.pptx" },
    { id: 4, title: "سیستەمێن دارایی د جیهانێ دا", grade: "11", pptx: "files/grade11-lesson2.pptx" },
    { id: 5, title: "داهاتی نەتەوەیی و گەشەکرن", grade: "12", pptx: "files/grade12-lesson1.pptx" },
    { id: 6, title: "سیاسەتا نەقدی و بەنکا ناڤەندی", grade: "12", pptx: "files/grade12-lesson2.pptx" },
];

// Default Ministerial Questions
let defaultQuestions = [
    { id: 1, title: "پرسیارێن وەزاری - ساڵا ۲۰۲۳ (خولا ١)", file: "files/2023-1.pdf" },
    { id: 2, title: "پرسیارێن وەزاری - ساڵا ۲۰۲۳ (خولا ٢)", file: "files/2023-2.pdf" },
    { id: 3, title: "پرسیارێن وەزاری - ساڵا ۲۰۲۴ (خولا ١)", file: "files/2024-1.pdf" }
];

// Default Quizzes (Now with 4 Options)
let defaultQuizzes = [
    {
        id: 1,
        title: "چەمکێ ئابووری ب تەمامی بریتییە ژ چ؟",
        options: [
            "زانستا ڕێکخستن و بڕێوەبرتنا سەرچاوەیان", 
            "تەنێ کۆمکرنا پەرەیی د بەنکێ دا", 
            "بازرگانیا دەرەکی ب بێ پلاندانان",
            "کڕینا کەلوپەلان ژ بازاڕی ب تەنێ"
        ],
        correct: 1
    },
    {
        id: 2,
        title: "دەسەڵاتا دەرکرنا دراڤی (پەرەیی) ل دەست خوەدیێ چ لایەنەکییە؟",
        options: [
            "بەنکێن بازرگانی یێن تایبەت", 
            "بەنکا ناڤەندی یا دەولەتێ", 
            "وەزارەتا بازرگانی",
            "کمپانیێن مەزن یێن بەرهەمهێنانێ"
        ],
        correct: 2
    }
];

// Read from LocalStorage or fallback to default
let lessonsData = JSON.parse(localStorage.getItem('muri_lessons')) || defaultLessons;
let ministerialData = JSON.parse(localStorage.getItem('muri_questions')) || defaultQuestions;
let quizData = JSON.parse(localStorage.getItem('muri_quizzes')) || defaultQuizzes;

// Render PowerPoint Lessons
function generateLessons() {
    const container = document.getElementById('lessonsContainer');
    if (!container) return;
    container.innerHTML = '';

    lessonsData.forEach((lesson) => {
        const card = document.createElement('div');
        card.className = 'lesson-card';
        card.setAttribute('data-grade', lesson.grade);
        card.setAttribute('data-title', lesson.title.toLowerCase());

        card.innerHTML = `
            <div>
                <span class="card-tag">پۆلا ${lesson.grade}ی وێژەیی</span>
                <h3>${lesson.title}</h3>
                <p>فایلا شیکارکری یا پاوەرپۆینتێ (PPT) تایبەت ب بابەتێ ${lesson.title}.</p>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 10px;">
                <a href="${lesson.pptx}" download class="btn-ppt-download" style="flex: 1;"><i class="fa-solid fa-file-powerpoint"></i> داگرتن</a>
                <button onclick="deleteLesson(${lesson.id})" style="background: #ef4444; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer;" title="مەسحکرن"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Render Ministerial Questions
function generateMinisterial() {
    const container = document.getElementById('ministerialContainer');
    if (!container) return;
    container.innerHTML = '';

    ministerialData.forEach(q => {
        const card = document.createElement('div');
        card.className = 'ministerial-card';
        card.innerHTML = `
            <i class="fa-solid fa-file-pdf pdf-icon"></i>
            <h4>${q.title}</h4>
            <a href="${q.file}" download class="btn-download"><i class="fa-solid fa-download"></i> داگرتنا PDF</a>
            <br>
            <button onclick="deleteQuestion(${q.id})" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; margin-top: 10px; font-size: 0.8rem;"><i class="fa-solid fa-trash"></i> مەسحکرن</button>
        `;
        container.appendChild(card);
    });
}

// Render Quizzes
function generateQuizzes() {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    container.innerHTML = '';

    quizData.forEach((q) => {
        const card = document.createElement('div');
        card.className = 'quiz-interactive-card';
        
        let optionsHTML = '';
        q.options.forEach((opt, idx) => {
            optionsHTML += `<button class="quiz-opt-btn" onclick="checkAnswer(this, ${idx + 1}, ${q.correct})">${opt}</button>`;
        });

        card.innerHTML = `
            <h4><i class="fa-solid fa-circle-question" style="color:#0284c7;"></i> ${q.title}</h4>
            <div class="quiz-options">${optionsHTML}</div>
            <div class="quiz-result-msg"></div>
            <button onclick="deleteQuiz(${q.id})" style="background:none; border:none; color:#ef4444; cursor:pointer; margin-top:10px; font-size:0.8rem;"><i class="fa-solid fa-trash"></i> مەسحکرنا کویزێ</button>
        `;
        container.appendChild(card);
    });
}

// Interactive Answer Check
function checkAnswer(btn, selected, correct) {
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll('.quiz-opt-btn');
    const msgBox = parent.nextElementSibling;

    buttons.forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.classList.add('correct');
        msgBox.innerHTML = '<span style="color:#16a34a;"><i class="fa-solid fa-circle-check"></i> دەستخۆش! بەرسڤا تە یا دروستە.</span>';
    } else {
        btn.classList.add('wrong');
        buttons[correct - 1].classList.add('correct');
        msgBox.innerHTML = '<span style="color:#ef4444;"><i class="fa-solid fa-circle-xmark"></i> ببوورە بەرسڤ خەلەت بوو! بەرسڤا دروست ب ڕەنگێ کەسک دیار بوو.</span>';
    }
}

// Delete Handlers
function deleteLesson(id) {
    if (confirm("تۆ پشتڕاستی دڤێت ئەڤ وانەیە بێتە مەسحکرن؟")) {
        lessonsData = lessonsData.filter(lesson => lesson.id !== id);
        localStorage.setItem('muri_lessons', JSON.stringify(lessonsData));
        generateLessons();
    }
}

function deleteQuestion(id) {
    if (confirm("تۆ پشتڕاستی دڤێت ئەڤ پرسیارە بێتە مەسحکرن؟")) {
        ministerialData = ministerialData.filter(q => q.id !== id);
        localStorage.setItem('muri_questions', JSON.stringify(ministerialData));
        generateMinisterial();
    }
}

function deleteQuiz(id) {
    if (confirm("تۆ پشتڕاستی دڤێت ئەڤ کویزە بێتە مەسحکرن؟")) {
        quizData = quizData.filter(q => q.id !== id);
        localStorage.setItem('muri_quizzes', JSON.stringify(quizData));
        generateQuizzes();
    }
}

// Toggle Modal Admin Panel
function toggleAdminPanel() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.classList.toggle('hidden');
    }
}

function toggleFormFields() {
    const type = document.getElementById('contentType').value;
    const pptFields = document.getElementById('pptFields');
    const quizFields = document.getElementById('quizFields');
    const fileGroup = document.getElementById('fileGroup');

    if (type === 'ppt') {
        pptFields.style.display = 'block';
        quizFields.style.display = 'none';
        fileGroup.style.display = 'block';
    } else if (type === 'quiz') {
        pptFields.style.display = 'none';
        quizFields.style.display = 'block';
        fileGroup.style.display = 'none';
    } else {
        pptFields.style.display = 'none';
        quizFields.style.display = 'none';
        fileGroup.style.display = 'block';
    }
}

// Submit Admin Content
function handleAdminSubmit(event) {
    event.preventDefault();
    const type = document.getElementById('contentType').value;
    const title = document.getElementById('contentTitle').value;
    const newId = Date.now();

    if (type === 'ppt') {
        const grade = document.getElementById('lessonGrade').value;
        const file = document.getElementById('contentFile').value;
        lessonsData.unshift({ id: newId, title, grade, pptx: file });
        localStorage.setItem('muri_lessons', JSON.stringify(lessonsData));
        generateLessons();
        document.getElementById('ppt-section').scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'ministerial') {
        const file = document.getElementById('contentFile').value;
        ministerialData.unshift({ id: newId, title, file });
        localStorage.setItem('muri_questions', JSON.stringify(ministerialData));
        generateMinisterial();
        document.getElementById('ministerial').scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'quiz') {
        const opt1 = document.getElementById('opt1').value;
        const opt2 = document.getElementById('opt2').value;
        const opt3 = document.getElementById('opt3').value;
        const opt4 = document.getElementById('opt4') ? document.getElementById('opt4').value : '';
        const correctOpt = parseInt(document.getElementById('correctOpt').value) || 1;

        quizData.unshift({
            id: newId,
            title: title,
            options: [opt1, opt2, opt3, opt4],
            correct: correctOpt
        });
        localStorage.setItem('muri_quizzes', JSON.stringify(quizData));
        generateQuizzes();
        document.getElementById('quizzes').scrollIntoView({ behavior: 'smooth' });
    }

    toggleAdminPanel();
    document.getElementById('addContentForm').reset();
}

function filterByGrade(grade, btnElement) {
    const cards = document.querySelectorAll('.lesson-card');
    
    if (btnElement) {
        document.querySelectorAll('.grade-buttons button').forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');
    }

    cards.forEach(card => {
        if (grade === 'all' || card.getAttribute('data-grade') === grade) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });

    if (!btnElement && grade !== 'all') {
        document.getElementById('ppt-section').scrollIntoView({ behavior: 'smooth' });
    }
}

function filterLessons() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const filterValue = input.value.toLowerCase();
    const cards = document.querySelectorAll('.lesson-card');

    cards.forEach(card => {
        const title = card.getAttribute('data-title') || '';
        card.style.display = title.includes(filterValue) ? "flex" : "none";
    });
}

// Load all items on Startup
window.addEventListener('DOMContentLoaded', () => {
    generateLessons();
    generateMinisterial();
    generateQuizzes();
});