const questions = [
    { q: "¿Qué son los principios éticos y los valores?", options: ["Normas universales y creencias fundamentales", "Leyes de tránsito", "Reglas de programación", "Decretos municipales"], correct: "Normas universales y creencias fundamentales" },
    { q: "¿Qué principio ético es fundamental en la ingeniería de sistemas?", options: ["Integridad", "Velocidad", "Lucro", "Individualismo"], correct: "Integridad" },
    { q: "¿Qué son los valores personales o profesionales?", options: ["Creencias que guían el comportamiento e ideales", "Títulos académicos", "Sueldos y beneficios", "Leyes del estado"], correct: "Creencias que guían el comportamiento e ideales" },
    { q: "¿Qué es el ordenamiento legal?", options: ["Conjunto de normas, leyes y principios que regulan la sociedad", "Un manual de hardware", "Un contrato privado", "Un algoritmo de búsqueda"], correct: "Conjunto de normas, leyes y principios que regulan la sociedad" },
    { q: "¿Qué es la deontología?", options: ["Rama de la ética que estudia los deberes y normas", "Estudio de las consecuencias", "Derecho penal", "Administración de empresas"], correct: "Rama de la ética que estudia los deberes y normas" },
    { q: "¿Qué es la deontología en la ingeniería de sistemas?", options: ["Estudio de normas éticas que guían la conducta del ingeniero", "Reparación de computadoras", "Venta de software", "Gestión de bases de datos"], correct: "Estudio de normas éticas que guían la conducta del ingeniero" },
    { q: "¿Qué es el derecho público?", options: ["Regula las relaciones entre individuos y el Estado", "Contratos privados", "Derecho de autor", "Ventas comerciales"], correct: "Regula las relaciones entre individuos y el Estado" },
    { q: "¿Qué regula el derecho administrativo?", options: ["Organización, funciones y procedimientos del Estado", "Contratos laborales", "Propiedad intelectual", "Protección de datos"], correct: "Organización, funciones y procedimientos del Estado" },
    { q: "¿Qué es el derecho laboral o derecho del trabajo?", options: ["Regula relaciones entre empleadores y trabajadores", "Regula el medio ambiente", "Regula el hacking", "Regula los contratos del Estado"], correct: "Regula relaciones entre empleadores y trabajadores" },
    { q: "¿Qué regula el derecho medioambiental?", options: ["Actividades humanas en relación con el medio ambiente", "Telecomunicaciones", "Propiedad privada", "Derecho penal"], correct: "Actividades humanas en relación con el medio ambiente" },
    { q: "¿Cuál es el objetivo principal de la Ley 164 en Bolivia?", options: ["Acceso equitativo a telecomunicaciones y TIC", "Cobrar impuestos", "Prohibir el internet", "Regular los sindicatos"], correct: "Acceso equitativo a telecomunicaciones y TIC" },
    { q: "¿Qué es la propiedad intelectual?", options: ["Derechos exclusivos sobre creaciones intelectuales e inventos", "Derechos sobre casas y terrenos", "Dinero en el banco", "Equipos informáticos"], correct: "Derechos exclusivos sobre creaciones intelectuales e inventos" },
    { q: "¿Por qué es crucial la propiedad intelectual en software?", options: ["Protege creaciones e incentiva la innovación", "Para que sea gratuito", "Para evitar que se use", "No tiene importancia"], correct: "Protege creaciones e incentiva la innovación" },
    { q: "¿Qué dilema ético pueden enfrentar los ingenieros de sistemas?", options: ["Desarrollo de sistemas que invadan la privacidad", "Elegir un lenguaje de programación", "Llegar tarde al trabajo", "El precio del hardware"], correct: "Desarrollo de sistemas que invadan la privacidad" },
    { q: "¿Qué es la informática forense?", options: ["Recopilar, analizar y reportar datos digitales de manera legal", "Arreglar archivos borrados", "Hackear sistemas", "Instalar software"], correct: "Recopilar, analizar y reportar datos digitales de manera legal" },
    { q: "¿Qué constituye un delito informático?", options: ["Actividades ilegales que involucran tecnologías", "Olvidar la contraseña", "Usar programas piratas", "Navegar por la Deep Web"], correct: "Actividades ilegales que involucran tecnologías" },
    { q: "¿Qué es un hacker?", options: ["Persona con conocimiento profundo dedicada al aprendizaje", "Alguien que roba bancos", "Un virus informático", "Un estafador"], correct: "Persona con conocimiento profundo dedicada al aprendizaje" },
    { q: "¿Qué es un cracker?", options: ["Persona que vulnera seguridad con intenciones maliciosas", "Un experto en redes", "Un programa para hackear", "Un reparador de hardware"], correct: "Persona que vulnera seguridad con intenciones maliciosas" },
    { q: "¿Cuál es la diferencia principal entre un hacker y un cracker?", options: ["La motivación y las actividades (daño vs aprendizaje)", "La edad", "La marca de computadora", "Ninguna"], correct: "La motivación y las actividades (daño vs aprendizaje)" }
];

let currentIdx = 0;
let score = 0;
let canClick = true;

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

function restartQuiz() {
    currentIdx = 0;
    score = 0;
    document.getElementById('results').classList.add('hidden');
    document.getElementById('game-area').classList.remove('hidden');
    renderQuestion();
}

function renderQuestion() {
    canClick = true;
    const qData = questions[currentIdx];
    
    // UI Updates
    document.getElementById('q-count').innerText = `${String(currentIdx + 1).padStart(2, '0')}/${questions.length}`;
    document.getElementById('question').innerText = qData.q;
    document.getElementById('progress').style.width = `${((currentIdx) / questions.length) * 100}%`;

    const grid = document.getElementById('choices-grid');
    grid.innerHTML = '';

    shuffle([...qData.options]).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, btn);
        grid.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    if (!canClick) return;
    canClick = false;

    const correct = questions[currentIdx].correct;
    if (selected === correct) {
        score++;
        btn.classList.add('correct');
    } else {
        btn.classList.add('wrong');
        // Mostrar la correcta
        Array.from(document.querySelectorAll('.choice-btn')).forEach(b => {
            if (b.innerText === correct) b.classList.add('correct');
        });
    }

    setTimeout(() => {
        currentIdx++;
        if (currentIdx < questions.length) renderQuestion();
        else showFinal();
    }, 1400);
}

function showFinal() {
    document.getElementById('game-area').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('progress').style.width = '100%';
    document.getElementById('score-text').innerText = score;
    
    const messages = {
        perfect: "¡Impresionante! Tienes un dominio total.",
        good: "¡Muy bien! Conoces bien la ingeniería legal.",
        low: "Sigue estudiando, la ética profesional es clave."
    };
    
    let msg = score === 19 ? messages.perfect : (score > 12 ? messages.good : messages.low);
    document.getElementById('feedback-msg').innerText = msg;
}

restartQuiz();