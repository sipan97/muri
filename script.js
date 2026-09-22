let isAdmin = false;

// دروستکرنا خودکار یا ٥٠ وانەیان ب ناڤێن کوردی
function generateKurdishLessons(folderName, gradeNum, totalCount) {
    let list = [];
    for (let i = 1; i <= totalCount; i++) {
        list.push({
            id: parseInt(`${gradeNum}${i}`),
            title: `وانەیا ژمارە ${i} - پۆلا ${gradeNum}ی وێژەیی`,
            class: `${gradeNum}`,
            tag: `پۆلا ${gradeNum}ی وێژەیی`,
            desc: `فایلا پاوەرپۆینت (PPT) یا وانەیا ${i} تایبەت ب پۆلا ${gradeNum}ی وێژەیی.`,
            // لێرە ناڤێ فایلی ڕاستەوخۆ دگەل پەیڤا (وانەیا) و ژمارەیێ دهێتە ڕێکخستن
            link: `files/${folderName}/وانەیا ${i}.pptx` 
        });
    }
    return list;
}

// کومکرنا هەموو وانەیان (٥٠ بۆ پۆلا ١٠، ٥٠ بۆ پۆلا ١١، ٥٠ بۆ پۆلا ١٢)
let ppts = [
    ...generateKurdishLessons("pola10", "10", 50),
    ...generateKurdishLessons("pola11", "11", 50),
    ...generateKurdishLessons("pola12", "12", 50)
];

// پرسیارێن وەزاری
let ministerials = JSON.parse(localStorage.getItem('saved_ministerials')) || [
    { id: 1, title: "پرسیارێن وەزاری - ساڵا ۲۰۲۳ (خولا ١)", link: "files/ministerial/2023_khola1.pdf" }
];

// کویز و تاقیکرن
let quizzes = JSON.parse(localStorage.getItem('saved_quizzes')) || [
    {
        id: 1,
        question: "چەمکێ ئابووری ب تەمامی بریتییە ژ چ؟",
        options: [
            "زانستا ڕێکخستن و بەرێوەبرتنا سەرچاوەیان",
            "تەنێ کۆمکرنا پەڕەیی د بەنکێ دا",
            "بازرگانیا دەرەکی ب بێ پلاندانان"
        ],
        correctIndex: 0
    }
];

// Toggle Admin Modal Panel
function toggleAdminPanel() {
    const password = prompt("تکایە پاسوۆردێ ئەدمینی بنڤێسە:");
    if (password === "22334456") {
        const modal = document.getElementById("adminModal");
        if (modal) {
            modal.style.display = modal.style.display === "flex" ? "none" : "flex";
        }
    } else if (password !== null) {
        alert("پاسوۆرد شاشە!");
    }
}

// Render Lessons (PPTs)
function renderLessons(filter = 'all') {
    const container = document.getElementById("lessonsContainer");
    if (!container) return;
    
    const filtered = filter === 'all' ? ppts : ppts.filter(item => item.class === filter);

    container.innerHTML = filtered.map(item => `
        <div class="data-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 15px;">
            <span class="card-tag" style="background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; font-weight: bold;">${item.tag}</span>
            <h3 style="margin: 10px 0; color: #1e293b;">${item.title}</h3>
            <p style="color: #64748b; font-size: 0.95rem;">${item.desc}</p>
            <div class="card-actions" style="margin-top: 15px;">
                <a href="${item.link}" target="_blank" class="btn-download" style="background: #3b82f6; color: white; padding: 8px 15px; border-radius: 6px; text-decoration: none; display: inline-block;">
                    <i class="fa-solid fa-eye"></i> سەحکرنا وانەیێ
                </a>
            </div>
        </div>
    `).join('');
}

// Render Ministerial Questions
function renderMinisterials() {
    const container = document.getElementById("ministerialContainer");
    if (!container) return;
    
    container.innerHTML = ministerials.map(item => `
        <div class="pdf-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
            <div class="pdf-icon" style="color: #ef4444; font-size: 2rem; margin-bottom: 10px;"><i class="fa-solid fa-file-pdf"></i></div>
            <h3 style="margin-bottom: 15px; color: #1e293b; font-size: 1rem;">${item.title}</h3>
            <a href="${item.link}" class="pdf-link" target="_blank" style="background: #10b981; color: white; padding: 8px 15px; border-radius: 6px; text-decoration: none; display: inline-block;">
                <i class="fa-solid fa-download"></i> داگرتنا PDF
            </a>
        </div>
    `).join('');
}

// Render Quizzes
function renderQuizzes() {
    const container = document.getElementById("quizContainer");
    if (!container) return;
    
    container.innerHTML = quizzes.map(q => `
        <div class="quiz-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 15px;">
            <div class="quiz-title" style="font-weight: bold; margin-bottom: 15px; color: #1e293b;"><i class="fa-solid fa-circle-question" style="color: #6366f1;"></i> ${q.question}</div>
            <div class="quiz-options" style="display: flex; flex-direction: column; gap: 10px;">
                ${q.options.map((opt, idx) => `
                    <div class="quiz-opt" onclick="selectOption(this, ${q.id},${idx})" style="padding: 10px 15px; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; transition: 0.2s;">${opt}</div>
                `).join('')}
            </div>
            <div class="quiz-feedback" id="feedback-${q.id}" style="margin-top: 1rem; font-weight: bold;"></div>
        </div>
    `).join('');
}

// Option Selection Logic
function selectOption(element, quizId, selectedIdx) {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const parent = element.parentElement;
    if (parent.classList.contains('disabled')) return;
    parent.classList.add('disabled');

    const options = parent.querySelectorAll('.quiz-opt');
    const feedbackBox = document.getElementById(`feedback-${quizId}`);

    const correctOpt = options[quiz.correctIndex];
    if (correctOpt) {
        correctOpt.style.border = "2px solid #10b981";
        correctOpt.style.backgroundColor = "#d1fae5";
        correctOpt.style.color = "#065f46";
    }

    if (selectedIdx === quiz.correctIndex) {
        if (feedbackBox) {
            feedbackBox.style.color = "#10b981";
            feedbackBox.innerHTML = "ئافەرین! بەرسڤا تە یا ڕاست بوو 🎉";
        }
    } else {
        element.style.border = "2px solid #ef4444";
        element.style.backgroundColor = "#fee2e2";
        element.style.color = "#991b1b";

        if (feedbackBox) {
            feedbackBox.style.color = "#ef4444";
            feedbackBox.innerHTML = "بەرسڤا تە شاش بوو! بەرسڤا ڕاست ب ڕەنگێ کەسک هاتیە دەستنیشانکرن.";
        }
    }
}

// Filter Lessons by Grade
function filterByGrade(cls, btn) {
    if (btn) {
        document.querySelectorAll('.filter-controls button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    renderLessons(cls);
}

// Live Search for Lessons
function filterLessons() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = ppts.filter(p => p.title.toLowerCase().includes(query));
    const container = document.getElementById("lessonsContainer");
    
    if (container) {
        container.innerHTML = filtered.map(item => `
            <div class="data-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 15px;">
                <span class="card-tag" style="background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; font-weight: bold;">${item.tag}</span>
                <h3 style="margin: 10px 0; color: #1e293b;">${item.title}</h3>
                <p style="color: #64748b; font-size: 0.95rem;">${item.desc}</p>
                <div class="card-actions" style="margin-top: 15px;">
                    <a href="${item.link}" target="_blank" class="btn-download" style="background: #3b82f6; color: white; padding: 8px 15px; border-radius: 6px; text-decoration: none; display: inline-block;">
                        <i class="fa-solid fa-eye"></i> سەحکرنا وانەیێ
                    </a>
                </div>
            </div>
        `).join('');
    }
}

// Initialization on Page Load
document.addEventListener("DOMContentLoaded", () => {
    renderLessons();
    renderMinisterials();
    renderQuizzes();
});