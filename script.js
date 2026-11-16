
const myQuestions = [
    {
        category: "Web Development",
        type: "single",
        qText: "Which language is used to make website structure?",
        options: ["CSS", "HTML", "Python", "Java"],
        correctAns: "HTML"
    },
    {
        category: "General Knowledge",
        type: "",
        qText: "What is the capital of Rajasthan?",
        options: ["Jodhpur", "Udaipur", "Jaipur", "Kota"],
        correctAns: "Jaipur"
    },
    {
        category: "Web Development",
        type: "multiple",
        qText: "Which of these are used for frontend?",
        options: ["HTML", "CSS", "JavaScript", "MySQL"],
        correctAns: ["HTML", "CSS", "JavaScript"]
    },
    {
        category: "JavaScript",
        type: "blank",
        qText: "Which keyword is used to make a constant variable in JS? (const / let / var)",
        correctAns: "const"
    },
    {
        category: "General Knowledge",
        type: "single",
        qText: "Which is the largest desert in India?",
        options: ["Sahara", "Thar", "Gobi", "Kalahari"],
        correctAns: "Thar"
    },
    {
        category: "JavaScript",
        type: "multiple",
        qText: "Which are correct ways to declare variable in JS?",
        options: ["let", "var", "const", "int"],
        correctAns: ["let", "var", "const"]
    },
    {
        category: "HTML",
        type: "blank",
        qText: "Which tag is used for image in HTML? Write tag name only (img / link / pic)",
        correctAns: "img"
    },
    {
        category: "Web Development",
        type: "single",
        qText: "Which CSS property changes text color?",
        options: ["font-size", "color", "background", "margin"],
        correctAns: "color"
    },
    {
        category: "General Knowledge",
        type: "single",
        qText: "Shahpura is in which district of Rajasthan?",
        options: ["Jaipur", "Ajmer", "Sikar", "Alwar"],
        correctAns: "Jaipur"
    },
    {
        category: "JavaScript",
        type: "blank",
        qText: "Which function is used to print in console? (console.log / print / echo)",
        correctAns: "console.log"
    }
];

let currentQ = 0;
let myMarks = 0;
let timeLeft = 30;
let timerInterval;

const qTextEl = document.getElementById("q-text");
const optionBoxEl = document.getElementById("option-box");
const nextBtnEl = document.getElementById("next-btn");
const skipBtnEl = document.getElementById("skip-btn");

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    document.getElementById("my-timer").innerText = `Time: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("my-timer").innerText = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            goNextQuestion(true); // time over, auto skip
        }
    }, 1000);
}

function loadMyQuestion() {
    const q = myQuestions[currentQ];
    document.getElementById("q-count").innerText = `Question ${currentQ + 1} / ${myQuestions.length}`;
    document.getElementById("my-score").innerText = `Score: ${myMarks}`;
    document.getElementById("q-category").innerText = q.category;
    document.getElementById("my-progress").style.width = `${(currentQ / myQuestions.length) * 100}%`;
    qTextEl.innerText = q.qText;
    optionBoxEl.innerHTML = "";

    if (q.type === "single") {
        q.options.forEach(opt => {
            optionBoxEl.innerHTML += `<label class="option"><input type="radio" name="myAns" value="${opt}"> ${opt}</label>`;
        });
    } else if (q.type === "multiple") {
        q.options.forEach(opt => {
            optionBoxEl.innerHTML += `<label class="option"><input type="checkbox" name="myAns" value="${opt}"> ${opt}</label>`;
        });
    } else {
        optionBoxEl.innerHTML = `<input type="text" id="blankAns" placeholder="Type your answer here...">`;
    }
    nextBtnEl.innerText = currentQ === myQuestions.length - 1 ? "Finish Quiz" : "Next Question ->";
    startTimer();
}

function checkMyAnswer() {
    const q = myQuestions[currentQ];
    let userAns;
    if (q.type === "single") {
        const sel = document.querySelector('input[name="myAns"]:checked');
        if (!sel) { alert("Please select one answer!"); return false; }
        userAns = sel.value;
        if (userAns === q.correctAns) myMarks++;
    } else if (q.type === "multiple") {
        const sels = document.querySelectorAll('input[name="myAns"]:checked');
        if (sels.length === 0) { alert("Select at least one!"); return false; }
        userAns = Array.from(sels).map(i => i.value);
        const c = [...q.correctAns].sort();
        const u = [...userAns].sort();
        if (c.length === u.length && c.every((v, i) => v === u[i])) myMarks++;
    } else {
        userAns = document.getElementById("blankAns").value.trim();
        if (userAns === "") { alert("Please type answer!"); return false; }
        if (userAns.toLowerCase() === q.correctAns.toLowerCase()) myMarks++;
    }
    return true;
}

function goNextQuestion(isSkip = false) {
    if (!isSkip) {
        if (!checkMyAnswer()) return;
    }
    clearInterval(timerInterval);
    currentQ++;
    if (currentQ < myQuestions.length) {
        loadMyQuestion();
    } else {
        showMyResult();
    }
}

nextBtnEl.addEventListener("click", () => goNextQuestion(false));
skipBtnEl.addEventListener("click", () => goNextQuestion(true));

function showMyResult() {
    document.getElementById("game-area").classList.add("hide");
    document.getElementById("final-box").classList.remove("hide");
    document.getElementById("final-marks").innerText = `${myMarks} / ${myQuestions.length}`;
    let per = (myMarks / myQuestions.length) * 100;
    let msg = per >= 80 ? "Excellent Gaurav! You are a Quiz Champion!" : per >= 50 ? "Good Job! Keep Learning!" : "Keep Practicing, You Can Do Better!";
    document.getElementById("final-msg").innerText = msg;
    document.getElementById("final-feedback").innerText = `You scored ${per}% in Gaurav's Quiz Challenge.`;
}

function startAgain() {
    currentQ = 0; myMarks = 0;
    document.getElementById("final-box").classList.add("hide");
    document.getElementById("game-area").classList.remove("hide");
    loadMyQuestion();
}

loadMyQuestion();
