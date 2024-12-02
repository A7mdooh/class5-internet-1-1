// أسماء الطلاب
let studentNames = [];
let studentScores = [0, 0, 0];
let currentQuestionIndex = 0;
let studentAnswers = [false, false, false]; // لتعقب إجابات الطلاب
let currentStudentIndex = 0; // لتعقب الطالب الحالي

// أسئلة تتعلق باستخدام الإنترنت والبريد الإلكتروني مع الخيارات النصية
const questions = [
    {
        question: "ما هو المتصفح؟",
        answers: ["تطبيق يستخدم لفتح مواقع الإنترنت وتصفحها.", "تطبيق يستخدم لإرسال البريد الإلكتروني.", "برنامج لتحرير النصوص.", "برنامج لمشاهدة الفيديوهات."],
        correct: 0
    },
    {
        question: "كيف يمكنك فتح موقع إنترنت؟",
        answers: ["فتح تطبيق البريد الإلكتروني وكتابة العنوان.", "استخدام شريط العنوان لكتابة عنوان الموقع.", "فتح تطبيق معالجة النصوص وكتابة الموقع.", "استخدام زر البحث للوصول إلى الموقع."],
        correct: 1
    },
    {
        question: "كيف يمكنك نسخ نص من موقع إنترنت؟",
        answers: ["انقر بالزر الأيسر ثم اختر أمر Paste.", "انقر بالزر الأيمن على النص ثم اختر Copy.", "افتح تطبيق البريد الإلكتروني.", "استخدم لوحة المفاتيح للنسخ."],
        correct: 1
    },
    {
        question: "ما هو البريد الإلكتروني؟",
        answers: ["وسيلة لفتح مواقع الإنترنت.", "وسيلة لإرسال واستقبال الرسائل عبر شبكة الإنترنت.", "وسيلة لكتابة النصوص وتحريرها.", "برنامج لمشاهدة الصور والفيديوهات."],
        correct: 1
    },
    {
        question: "كيف يمكنك إرسال رسالة بريد إلكتروني؟",
        answers: ["النقر على \"Reply\".", "النقر على \"New mail\".", "فتح المتصفح وكتابة الرسالة.", "فتح ملف نصي وكتابة الرسالة."],
        correct: 1
    },
    {
        question: "كيف يمكنك الرد على رسالة البريد الإلكتروني؟",
        answers: ["النقر على \"New mail\".", "النقر على \"Attach file\".", "النقر على \"Reply\" أو \"Reply all\".", "فتح المتصفح وكتابة الرد."],
        correct: 2
    },
    {
        question: "كيف يمكنك إرفاق ملف إلى رسالة البريد الإلكتروني؟",
        answers: ["النقر على \"Reply\".", "النقر على \"Attach file\" ثم اختيار الملف من الحاسوب.", "كتابة عنوان الملف في صندوق الموضوع.", "فتح الملف باستخدام المتصفح."],
        correct: 1
    }
];

// بدء التحدي
function startChallenge() {
    const student1 = document.getElementById('student1').value;
    const student2 = document.getElementById('student2').value;
    const student3 = document.getElementById('student3').value;

    if (student1 && student2 && student3) {
        studentNames = [student1, student2, student3];
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('question-screen').style.display = 'block';
        showQuestion();
        updateStudentTurn(); // إظهار دور الطالب الحالي
    } else {
        alert("يرجى إدخال أسماء الطلاب الثلاثة.");
    }
}

// عرض السؤال
function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;

        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((button, index) => {
            button.textContent = currentQuestion.answers[index];
            button.disabled = false; // إعادة تفعيل الأزرار
        });

        studentAnswers = [false, false, false]; // إعادة تعيين الإجابات
    } else {
        document.getElementById('who-is-winner').style.display = 'block';
        document.getElementById('students-waiting').style.display = 'none';
    }
}

// تشغيل الصوت عند التمرير أو الضغط
const hoverSound = document.getElementById('hover-sound');
document.querySelectorAll('.answer-btn').forEach(button => {
    button.addEventListener('mouseover', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });

    button.addEventListener('click', (event) => {
        hoverSound.currentTime = 0;
        hoverSound.play();
        const answerIndex = parseInt(event.target.getAttribute('data-answer'));
        const correctAnswer = questions[currentQuestionIndex].correct;

        // تحديد الطالب الذي يجيب
        let studentIndex = currentStudentIndex;

        if (!studentAnswers[studentIndex]) {
            if (answerIndex === correctAnswer) {
                studentScores[studentIndex] += 10;
            }
            studentAnswers[studentIndex] = true;

            // الانتقال إلى الطالب التالي
            currentStudentIndex = (currentStudentIndex + 1) % 3;
            updateStudentTurn();

            if (studentAnswers.every(answered => answered === true)) {
                currentQuestionIndex++;
                showQuestion();
            }
        }
    });
});

// تحديث دور الطالب
function updateStudentTurn() {
    document.getElementById('student-turn').textContent = studentNames[currentStudentIndex];
}

// عرض الفائز
function showWinner() {
    document.getElementById('question-screen').style.display = 'none';

    const maxScore = Math.max(...studentScores);
    const winnerIndex = studentScores.indexOf(maxScore);

    document.getElementById('winner-name').textContent = studentNames[winnerIndex];
    document.getElementById('winner-screen').style.display = 'block';
}

// إعادة البدء
function restart() {
    location.reload();
}
