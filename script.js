const questions = [
    { q: "Как вы относитесь к кропотливой работе руками?", a: "Обожаю, я очень усидчив(а) (2)", b: "Нормально, если есть результат (1)", c: "Это скучно для меня (0)" },
    { q: "Важна ли для вас идеальная чистота?", a: "Да, я перфекционист (2)", b: "В меру (1)", c: "Главное — процесс (0)" },
    { q: "Готовы ли вы постоянно учить химию и составы?", a: "Да, мне это интересно (2)", b: "Только самое необходимое (1)", c: "Не люблю теорию (0)" },
    { q: "Как вы реагируете на капризных клиентов?", a: "Спокойно и профессионально (2)", b: "Нервничаю, но терплю (1)", c: "Могу ответить резко (0)" },
    { q: "Следите ли вы за бьюти-новинками?", a: "Постоянно изучаю тренды (2)", b: "Иногда читаю об этом (1)", c: "Почти не слежу (0)" },
    { q: "Готовы ли вы к физическим нагрузкам (весь день на ногах)?", a: "Да, я вынослив(а) (2)", b: "Будет тяжело, но справлюсь (1)", c: "Нет, быстро устаю (0)" },
    { q: "Важно ли вам помогать людям стать красивее?", a: "Да, это мое призвание (2)", b: "Это просто хорошая работа (1)", c: "Меня это мало волнует (0)" },
    { q: "У вас хорошее зрение и твердая рука?", a: "Да, всё отлично (2)", b: "В очках работаю хорошо (1)", c: "Есть некоторые сложности (0)" }
];

let currentStep = 0;
let score = 0;

// Ждем загрузки DOM, чтобы кнопка точно нашлась
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.onclick = startQuiz;
    }
    
    document.getElementById('lead-form').onsubmit = (e) => {
        e.preventDefault();
        showResult();
    };
});

function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('question-screen').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const q = questions[currentStep];
    document.getElementById('question-text').innerText = q.q;
    document.getElementById('question-number').innerText = `Вопрос ${currentStep + 1}/8`;
    document.getElementById('progress').style.width = `${((currentStep + 1) / 8) * 100}%`;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    // Создаем кнопки
    optionsDiv.appendChild(createOpt(q.a, 2));
    optionsDiv.appendChild(createOpt(q.b, 1));
    optionsDiv.appendChild(createOpt(q.c, 0));
}

function createOpt(text, points) {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = text;
    btn.onclick = () => {
        score += points;
        currentStep++;
        if (currentStep < questions.length) {
            showQuestion();
        } else {
            document.getElementById('question-screen').classList.add('hidden');
            document.getElementById('form-screen').classList.remove('hidden');
        }
    };
    return btn;
}

function showResult() {
    document.getElementById('form-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');

    const status = document.getElementById('result-status');
    const desc = document.getElementById('result-desc');

    if (score >= 13) {
        status.innerText = "Горячий лид";
        desc.innerText = "Вы идеальный кандидат! Профессия косметолога подходит вам на 100%.";
    } else if (score >= 8) {
        status.innerText = "Тёплый лид";
        desc.innerText = "У вас хорошие задатки, но стоит пройти базовое обучение для старта.";
    } else {
        status.innerText = "Холодный лид";
        desc.innerText = "Возможно, вам стоит присмотреться к другим направлениям в бьюти-индустрии.";
    }
}
