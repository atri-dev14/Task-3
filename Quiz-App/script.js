const quizQuestions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "High-Level Text Machine Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which property is used in CSS to change the text color of an element?",
        answers: [
            { text: "font-color", correct: false },
            { text: "text-color", correct: false },
            { text: "color", correct: true },
            { text: "font-style", correct: false }
        ]
    },
    {
        question: "What is the correct way to declare a variable in JavaScript that can be reassigned?",
        answers: [
            { text: "const myVar = 10;", correct: false },
            { text: "let myVar = 10;", correct: true },
            { text: "var myVar = 10;", correct: false },
            { text: "variable myVar = 10;", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to link a JavaScript file?",
        answers: [
            { text: "<js>", correct: false },
            { text: "<javascript>", correct: false },
            { text: "<link>", correct: false },
            { text: "<script>", correct: true }
        ]
    },
    {
        question: "How do you select an element with the id 'header' in CSS?",
        answers: [
            { text: ".header", correct: false },
            { text: "#header", correct: true },
            { text: "header", correct: false },
            { text: "*header", correct: false }
        ]
    },
    {
        question: "In the CSS Box Model, what is the correct order from the inside out?",
        answers: [
            { text: "Content, Padding, Border, Margin", correct: true },
            { text: "Content, Border, Padding, Margin", correct: false },
            { text: "Padding, Content, Border, Margin", correct: false },
            { text: "Margin, Border, Padding, Content", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        answers: [
            { text: "String", correct: false },
            { text: "Boolean", correct: false },
            { text: "Number", correct: false },
            { text: "Object", correct: true }
        ]
    },
    {
        question: "Which HTML element is used to define an input field?",
        answers: [
            { text: "<input>", correct: true },
            { text: "<formfield>", correct: false },
            { text: "<textfield>", correct: false },
            { text: "<label>", correct: false }
        ]
    },
    {
        question: "How do you select all <p> elements inside a <div> with the class 'container'?",
        answers: [
            { text: "div.container p", correct: true },
            { text: "div > p.container", correct: false },
            { text: "div + p.container", correct: false },
            { text: "container.p", correct: false }
        ]
    },
    {
        question: "Which event fires when a user clicks on an HTML element?",
        answers: [
            { text: "onchange", correct: false },
            { text: "onmouseclick", correct: false },
            { text: "onclick", correct: true },
            { text: "onhover", correct: false }
        ]
    }
];

const questionTextElement = document.getElementById('question-text');
const answerOptionsElement = document.getElementById('answer-options');
const submitButton = document.getElementById('submit-btn');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    resultContainer.textContent = '';
    showQuestion();
}

function showQuestion() {
    resetState();
    
    const question = quizQuestions[currentQuestionIndex];
    
    questionTextElement.textContent = question.question;
    
    question.answers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer.text;
        li.dataset.correct = answer.correct;
        li.addEventListener('click', selectAnswer);
        answerOptionsElement.appendChild(li);
    });
}

function resetState() {
    while (answerOptionsElement.firstChild) {
        answerOptionsElement.removeChild(answerOptionsElement.firstChild);
    }
    
    selectedAnswer = null;
    submitButton.classList.remove('hide');
    submitButton.disabled = true;
    nextButton.classList.add('hide');
    resultContainer.textContent = '';
}

function selectAnswer(e) {
    Array.from(answerOptionsElement.children).forEach(li => {
        li.classList.remove('selected');
    });
    
    selectedAnswer = e.target;
    selectedAnswer.classList.add('selected');
    
    submitButton.disabled = false;
}

submitButton.addEventListener('click', () => {
    const isCorrect = selectedAnswer.dataset.correct === 'true';
    
    if (isCorrect) {
        score++;
        resultContainer.textContent = "Correct!";
        resultContainer.style.color = "#28a745";
    } else {
        resultContainer.textContent = "Wrong!";
        resultContainer.style.color = "#dc3545";
    }
    
    Array.from(answerOptionsElement.children).forEach(li => {
        if (li.dataset.correct === 'true') {
            li.classList.add('correct');
        } else if (li.classList.contains('selected')) {
            li.classList.add('incorrect');
        }
        li.style.pointerEvents = 'none';
    });
    
    submitButton.classList.add('hide');
    nextButton.classList.remove('hide');
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    questionTextElement.textContent = "Quiz Complete!";
    answerOptionsElement.innerHTML = '';
    
    resultContainer.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
    resultContainer.style.color = "#333";
    
    nextButton.textContent = "Restart Quiz";
    nextButton.classList.remove('hide');
    submitButton.classList.add('hide');
    
    const newNextButton = nextButton.cloneNode(true);
    nextButton.parentNode.replaceChild(newNextButton, nextButton);
    newNextButton.addEventListener('click', () => {
        newNextButton.textContent = "Next";
        startQuiz();
    });
}

startQuiz();