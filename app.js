// ======================================================
// PM² TRAINER
// ======================================================
// ======================================================
// VARIABLES
// ======================================================
let bancos = {};
let quiz = [];
let i = 0;
let ok = 0;
let bad = [];
let selectedTopics = new Set();
// ======================================================
// CRONÓMETRO
// ======================================================
let timerInterval = null;
let timerStart = null;
let elapsedTime = 0;
function startTimer() {
    stopTimer();
    elapsedTime = 0;
    timerStart = Date.now();
    updateTimerDisplay();
    timerInterval = setInterval(
        () => {
            elapsedTime = Date.now() - timerStart;
            updateTimerDisplay();
        },
        1000
    );
}
function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (timerStart !== null) {
        elapsedTime = Date.now() - timerStart;
    }
    timerStart = null;
}
function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    updateTimerDisplay();
}
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}
function updateTimerDisplay() {
    const timerElement = document.getElementById("quizTimer");
    if (!timerElement) {
        return;
    }
    timerElement.textContent = formatTime(elapsedTime);
}
// ======================================================
// DEFINICIÓN DE TEMAS
// ======================================================
const temas = [
    {
        id: 1,
        file: "tema1.txt",
        title: "Tema 1: Introducción a la Guía PM²",
        short: "Origen, CoEPM², iniciativa Open PM² y RAP.",
        info: "Introducción al origen de PM², el papel del Centre of Excellence in Project Management (CoEPM²), la iniciativa Open PM² y la RAP."
    },
    {
        id: 2,
        file: "tema2.txt",
        title: "Tema 2: Gestión de Proyectos",
        short: "Proyectos vs. operaciones, carteras, programas, entorno y competencias.",
        info: "Conceptos fundamentales de gestión de proyectos: diferencias entre proyectos y operaciones, carteras y programas, entorno de los proyectos y competencias necesarias para gestionarlos."
    },
    {
        id: 3,
        file: "tema3.txt",
        title: "Tema 3: Descripción de la Metodología PM²",
        short: 'Los cuatro pilares de "La Casa de PM²" y los PM² Mindsets.',
        info: 'Descripción de la metodología PM², los cuatro pilares representados por "La Casa de PM²" y los principios de comportamiento y pensamiento conocidos como PM² Mindsets.'
    },
    {
        id: 4,
        file: "tema4.txt",
        title: "Tema 4: Roles y Organización del Proyecto",
        short: "Gobernanza, responsabilidades y matriz RASCI.",
        info: "Estructura organizativa de PM², capas de gobernanza, responsabilidades de los diferentes roles y utilización de la matriz RASCI."
    },
    {
        id: 5,
        file: "tema5.txt",
        title: "Tema 5: Fase de Inicio",
        short: "Caso de Negocio, Acta de Constitución y puerta LpP.",
        info: "La fase de Inicio establece las bases del proyecto mediante el Caso de Negocio y el Acta de Constitución y conduce a la puerta de fase LpP (Listo para Planificar)."
    },
    {
        id: 6,
        file: "tema6.txt",
        title: "Tema 6: Fase de Planificación",
        short: "Manual de Proyecto, Plan de Trabajo y puerta LpE.",
        info: "La fase de Planificación desarrolla la documentación necesaria para ejecutar el proyecto, incluyendo el Manual de Proyecto y el Plan de Trabajo, y termina con la puerta LpE (Listo para Ejecutar)."
    },
    {
        id: 7,
        file: "tema7.txt",
        title: "Tema 7: Fase de Ejecución",
        short: "Coordinación del equipo, calidad e informes.",
        info: "La fase de Ejecución se centra en realizar el trabajo planificado, coordinar al equipo, asegurar la calidad de los entregables y elaborar los informes correspondientes."
    },
    {
        id: 8,
        file: "tema8.txt",
        title: "Tema 8: Fase de Cierre",
        short: "Lecciones aprendidas, informe final y disolución de recursos.",
        info: "La fase de Cierre formaliza la finalización del proyecto, recoge las lecciones aprendidas, prepara el informe final y permite la liberación o disolución de los recursos del proyecto."
    },
    {
        id: 9,
        file: "tema9.txt",
        title: "Tema 9: Seguimiento y Control",
        short: "Riesgos, cambios, requisitos, costes y cronograma.",
        info: "El Seguimiento y Control es transversal a las fases del proyecto e incluye la gestión de riesgos, cambios, requisitos, costes, cronograma, calidad y progreso."
    },
    {
        id: 10,
        file: "temax.txt",
        title: "Tema X: Mi resumen",
        short: "Preguntas extraídas de mis resúmenes.",
        info: "Tema personalizado con preguntas extraídas de tus resúmenes. El banco de preguntas se carga desde el archivo TemaX.txt."
    },
    {
        id: 11,
        file: "simulacro1.txt",
        title: "Simulacro 01",
        short: "Preguntas extraídas del manual IA Claude.",
        info: "Tema personalizado con preguntas hechas con IA Claude y con la fuente del manual oficial PM2."
    },
        {
        id: 12,
        file: "simulacro4.txt",
        title: "Simulacro 04",
        short: "Preguntas extraídas del manual IA Claude PRO.",
        info: "Tema personalizado con preguntas hechas con IA Claude mas dificiles  y con la fuente del manual oficial PM2."
    },
    {
        id: 13,
        file: "simulacro2.txt",
        title: "Simulacro 02",
        short: "Preguntas extraídas del manual IA Gemini mas dificiles.",
        info: "Tema personalizado con preguntas hechas con IA Gemini mas dificiles y con la fuente del manual oficial PM2."
    },
    {
        id: 14,
        file: "simulacro3.txt",
        title: "Simulacro 02",
        short: "Preguntas extraídas del manual IA ChatGPT mas dificiles.",
        info: "Tema personalizado con preguntas hechas con IA ChatGPT mas dificiles y con la fuente del manual oficial PM2."
    },
    {
        id: 15,
        file: "acronimos.txt",
        title: "Acrónimos y abreviaturas",
        short: "Preguntas extraídas de mis resúmenes.",
        info: "Esquema que resume la gobernanza PM² en cinco capas: roles de la parte solicitante (PP, RN, GIN), de la parte proveedora (PS, DP, ECP), las unidades de soporte y calidad (OSP, AdC) y los organismos institucionales de la UE (CoEPM², RAP, OLAP)."
    }
];
// ======================================================
// INICIO DE LA APLICACIÓN
// ======================================================
document.addEventListener("DOMContentLoaded", iniciarAplicacion);
async function iniciarAplicacion() {
    renderTopics();
    setupEvents();
    await cargarTodosLosBancos();
}
// ======================================================
// CONFIGURAR EVENTOS
// ======================================================
function setupEvents() {
    document.getElementById("start").addEventListener("click", startQuiz);
    document.getElementById("selectAll").addEventListener("click", toggleAllTopics);
    document.getElementById("closeModal").addEventListener("click", closeModal);
    document.getElementById("modalCloseBottom").addEventListener("click", closeModal);
    document.getElementById("infoModal").addEventListener(
        "click",
        event => {
            if (event.target.id === "infoModal") {
                closeModal();
            }
        }
    );
    document.addEventListener(
        "keydown",
        event => {
            if (event.key === "Escape") {
                closeModal();
            }
        }
    );
}
// ======================================================
// CARGAR TODOS LOS ARCHIVOS
// ======================================================
async function cargarTodosLosBancos() {
    try {
        const resultados = await Promise.all(
            temas.map(
                async tema => {
                    const response = await fetch(`preguntas/${tema.file}`);
                    if (!response.ok) {
                        throw new Error(`No se pudo cargar ${tema.file}`);
                    }
                    const texto = await response.text();
                    const preguntas = parse(texto);
                    return {
                        id: tema.id,
                        preguntas: preguntas
                    };
                }
            )
        );
        resultados.forEach(
            resultado => {
                bancos[resultado.id] = resultado.preguntas;
            }
        );
        actualizarContadores();
        document.getElementById("loading").style.display = "none";
        document.getElementById("setupContent").style.display = "block";
    } catch (error) {
        console.error(error);
        document.getElementById("loading").innerHTML = `
            <div class="load-error">
                <div class="error-icon">
                    &#9888;
                </div>
                <h2>Error cargando los bancos</h2>
                <p>No se han podido cargar los archivos de preguntas.</p>
                <p>Comprueba que existe la carpeta <strong>preguntas</strong> y contiene:</p>
                <div class="file-list">
                    tema1.txt<br>
                    tema2.txt<br>
                    tema3.txt<br>
                    tema4.txt<br>
                    tema5.txt<br>
                    tema6.txt<br>
                    tema7.txt<br>
                    tema8.txt<br>
                    tema9.txt<br>
                    TemaX.txt
                </div>
                <p class="server-warning">
                    Si has abierto index.html directamente,
                    utiliza un servidor local como Live Server.
                </p>
            </div>
        `;
    }
}
// ======================================================
// CREAR TARJETAS DE TEMAS
// ======================================================
function renderTopics() {
    const container = document.getElementById("topics");
    container.innerHTML = temas
        .map(
            tema => `
                <div class="topic-card" data-topic="${tema.id}">
                    <label class="topic-main">
                        <input
                            type="checkbox"
                            class="topic-checkbox"
                            value="${tema.id}"
                        >
                        <span class="custom-check">✓</span>
                        <span class="topic-number">${tema.id}</span>
                        <span class="topic-text">
                            <strong>${tema.title}</strong>
                            <small>${tema.short}</small>
                            <span
                                class="question-count"
                                id="count-${tema.id}"
                            >
                                Cargando...
                            </span>
                        </span>
                    </label>
                    <button
                        class="info-btn"
                        data-info="${tema.id}"
                        type="button"
                        aria-label="Información del tema ${tema.id}"
                    >
                        &#8505;
                    </button>
                </div>
            `
        )
        .join("");
    document
        .querySelectorAll(".topic-checkbox")
        .forEach(
            checkbox => {
                checkbox.addEventListener("change", handleTopicChange);
            }
        );
    document
        .querySelectorAll(".info-btn")
        .forEach(
            button => {
                button.addEventListener(
                    "click",
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                        const id = Number(button.dataset.info);
                        showTopicInfo(id);
                    }
                );
            }
        );
}
// ======================================================
// CAMBIO DE TEMA
// ======================================================
function handleTopicChange(event) {
    const id = Number(event.target.value);
    if (event.target.checked) {
        selectedTopics.add(id);
    } else {
        selectedTopics.delete(id);
    }
    updateTopicVisuals();
}
// ======================================================
// SELECCIONAR / DESELECCIONAR TODOS
// ======================================================
function toggleAllTopics() {
    if (selectedTopics.size === temas.length) {
        selectedTopics.clear();
    } else {
        selectedTopics = new Set(temas.map(tema => tema.id));
    }
    updateTopicVisuals();
}
// ======================================================
// ACTUALIZAR ASPECTO DE LOS TEMAS
// ======================================================
function updateTopicVisuals() {
    document
        .querySelectorAll(".topic-card")
        .forEach(
            card => {
                const id = Number(card.dataset.topic);
                const selected = selectedTopics.has(id);
                card.classList.toggle("selected", selected);
                const checkbox = card.querySelector(".topic-checkbox");
                checkbox.checked = selected;
            }
        );
    document.getElementById("selectAll").textContent =
        selectedTopics.size === temas.length
            ? "Deseleccionar todos"
            : "Seleccionar todos";
}
// ======================================================
// ACTUALIZAR CONTADORES
// ======================================================
function actualizarContadores() {
    temas.forEach(
        tema => {
            const preguntas = bancos[tema.id] || [];
            const element = document.getElementById(`count-${tema.id}`);
            if (!element) {
                return;
            }
            if (preguntas.length === 0) {
                element.textContent =
                    "⚠️ Sin preguntas";
                element.classList.add(
                    "no-questions"                );

            } else {
                element.textContent =
                    preguntas.length === 1
                        ? "1 pregunta"
                        : `${preguntas.length} preguntas`;
            }
        }
    );
}

// ======================================================
// MOSTRAR INFORMACIÓN DEL TEMA
// ======================================================
function showTopicInfo(id) {
    const tema = temas.find(tema => tema.id === id);
    if (!tema) {
        return;
    }
    document.getElementById("modalTitle").textContent = tema.title;
    document.getElementById("modalText").textContent = tema.info;
    const modal = document.getElementById("infoModal");
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.getElementById("closeModal").focus();
}
// ======================================================
// CERRAR INFORMACIÓN
// ======================================================
function closeModal() {
    const modal = document.getElementById("infoModal");
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}
// ======================================================
// COMENZAR TEST (CON DISTRIBUCIÓN PROPORCIONAL Y PRIORIZACIÓN)
// ======================================================
function startQuiz() {
    if (selectedTopics.size === 0) {
        alert("Selecciona al menos un tema.");
        return;
    }

    const cantidad = Number(document.getElementById("modo").value);
    
    // 1. Cargar historial de fallos desde LocalStorage
    const failedHistory = JSON.parse(localStorage.getItem("pm2_failed_history")) || {};

    // 2. Preparar los bancos seleccionados priorizando fallos
    let bancosDisponibles = Array.from(selectedTopics).map(id => {
        const preguntas = bancos[id] || [];
        
        // Separar las que el usuario ha fallado previamente de las que no
        const falladas = preguntas.filter(q => failedHistory[q.q]);
        const nuevas = preguntas.filter(q => !failedHistory[q.q]);

        return {
            id: id,
            // Ponemos las falladas primero, mezcladas, seguidas de las nuevas, mezcladas
            pool: [...shuffle(falladas), ...shuffle(nuevas)]
        };
    }).filter(banco => banco.pool.length > 0);

    const totalDisponible = bancosDisponibles.reduce((acc, banco) => acc + banco.pool.length, 0);
    
    if (totalDisponible === 0) {
        alert("No hay preguntas disponibles para los temas seleccionados.");
        return;
    }

    const objetivo = Math.min(cantidad, totalDisponible);
    let preguntasSeleccionadas = [];

    // 3. Algoritmo Round-Robin para distribución equitativa
    // Toma 1 pregunta de cada tema sucesivamente hasta alcanzar el objetivo
    while (preguntasSeleccionadas.length < objetivo && bancosDisponibles.length > 0) {
        for (let i = bancosDisponibles.length - 1; i >= 0; i--) {
            if (preguntasSeleccionadas.length >= objetivo) break;
            
            let banco = bancosDisponibles[i];
            
            if (banco.pool.length > 0) {
                // Sacar la primera pregunta de este banco (ya están priorizadas por fallo)
                preguntasSeleccionadas.push(banco.pool.shift());
            } else {
                // Si el tema se queda sin preguntas, lo eliminamos de la rotación
                bancosDisponibles.splice(i, 1);
            }
        }
    }

    // 4. Mezcla final para que los temas no aparezcan en un patrón predecible
    quiz = shuffle(preguntasSeleccionadas);
    
    i = 0;
    ok = 0;
    bad = [];
    
    startTimer();
    document.getElementById("setup").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
    show();
}
// ======================================================
// PARSER DE LOS ARCHIVOS TXT
// ======================================================
function parse(texto) {
    return texto
        .split("---")
        .map(
            bloque => bloque.trim()
        )
        .filter(
            bloque => Boolean(bloque)
        )
        .map(
            bloque => {
                const lineas = bloque
                    .split("\n")
                    .map(linea => linea.trim())
                    .filter(Boolean);
                const pregunta = lineas.find(
                    linea =>
                        !linea.startsWith("#") &&
                        !linea.startsWith("-") &&
                        !linea.startsWith("=") &&
                        !linea.startsWith(">")
                );
                const opciones = lineas
                    .filter(
                        linea => linea.startsWith("-")
                    )
                    .map(
                        linea =>
                            linea.slice(1).trim()
                    );
                const respuesta = lineas.find(
                    linea => linea.startsWith("=")
                );
                const explicacion = lineas.find(
                    linea => linea.startsWith(">")
                );
                return {
                    q: pregunta,
                    o: opciones,
                    a: respuesta
                        ? respuesta.slice(1).trim()
                        : "",
                    e: explicacion
                        ? explicacion.slice(1).trim()
                        : ""
                };
            }
        )
        .filter(
            pregunta =>
                pregunta.q &&
                pregunta.o.length >= 2 &&
                pregunta.a
        );
}
// ======================================================
// MOSTRAR PREGUNTA
// ======================================================
function show() {
    const q = quiz[i];
    if (!q) {
        return;
    }
    const opciones = shuffle([...q.o]);
    const progress = (i / quiz.length) * 100;
    app.innerHTML = `
        <div class="quiz-top">
            <button
                class="back-btn"
                onclick="backToSetup()"
                type="button"
            >
                &larr; Salir
            </button>
            <div class="quiz-info">
                <span class="quiz-topic">
                    Pregunta ${i + 1} / ${quiz.length}
                </span>
                <span
                    id="quizTimer"
                    class="quiz-timer"
                >
                    ${formatTime(elapsedTime)}
                </span>
            </div>
        </div>
        <div class="progress">
            <div
                class="bar"
                style="width:${progress}%"
            ></div>
        </div>
        <div class="card question-card">
            <div class="question-number">
                Pregunta ${i + 1}
            </div>
            <h2>
                ${escapeHtml(q.q)}
            </h2>
            <div class="options">
                ${opciones
                    .map(
                        (opcion, index) => `
                            <button
                                class="option"
                                onclick='ans(${JSON.stringify(opcion)})'
                                type="button"
                            >
                                <span class="option-letter">
                                    ${String.fromCharCode(65 + index)}
                                </span>
                                <span class="option-text-value">
                                    ${escapeHtml(opcion)}
                                </span>
                            </button>
                        `
                    )
                    .join("")
                }
            </div>
        </div>
    `;
}
// ======================================================
// RESPONDER
// ======================================================
function ans(valor) {
    const q = quiz[i];
    const correcta = valor === q.a;
    document
        .querySelectorAll(".option")
        .forEach(
            button => {
                button.disabled = true;
            }
        );

    // --- NUEVO: Gestión de historial de fallos ---
    let history = JSON.parse(localStorage.getItem("pm2_failed_history")) || {};

    if (correcta) {
        ok++;
        // Si la acierta, la borramos del historial de fallos para que deje de priorizarse
        if (history[q.q]) {
            delete history[q.q];
            localStorage.setItem("pm2_failed_history", JSON.stringify(history));
        }
    } else {
        bad.push(q);
        // Si la falla, la guardamos/incrementamos en el historial
        history[q.q] = (history[q.q] || 0) + 1;
        localStorage.setItem("pm2_failed_history", JSON.stringify(history));
    }
    // ---------------------------------------------

    const questionCard = document.querySelector(".question-card");
    if (!questionCard) {
        nextQ();
        return;
    }
    const feedback = document.createElement("div");
    feedback.className = `feedback ${
        correcta
            ? "feedback-good"
            : "feedback-bad"
    }`;
    feedback.innerHTML = `
        <div class="feedback-title">
            <span>
                ${correcta ? "&#9989;" : "&#10060;"}
            </span>
            <strong>
                ${
                    correcta
                        ? "¡Respuesta correcta!"
                        : "Respuesta incorrecta"
                }
            </strong>
        </div>
        <div class="feedback-answer">
            <strong>
                Respuesta correcta:
            </strong>
            <span>
                ${escapeHtml(q.a)}
            </span>
        </div>
        ${
            q.e
                ? `
                    <div class="feedback-explanation">
                        <strong>
                            &#128161; Explicación
                        </strong>
                        <p>
                            ${escapeHtml(q.e)}
                        </p>
                    </div>
                `
                : ""
        }
        <button
            class="continue-btn"
            type="button"
            onclick="nextQ()"
        >
            Continuar &rarr;
        </button>
    `;
    questionCard.appendChild(feedback);
    setTimeout(
        () => {
            feedback.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        },
        100
    );
}
// ======================================================
// SIGUIENTE PREGUNTA
// ======================================================
function nextQ() {
    i++;
    if (i < quiz.length) {
        show();
    } else {
        end();
    }
}
// ======================================================
// FINAL DEL TEST
// ======================================================
function end() {
    stopTimer();
    const nota = (
        ok /
        quiz.length *
        10
    ).toFixed(1);
    const porcentaje = Math.round(
        ok /
        quiz.length *
        100
    );
    app.innerHTML = `
        <div class="card result-card">
            <h1>
                ¡Test finalizado!
            </h1>
            <p class="result-message">
                ${
                    porcentaje >= 90
                        ? "¡Excelente resultado!"
                        : porcentaje >= 70
                            ? "¡Muy buen trabajo!"
                            : "Sigue practicando. ¡Cada intento cuenta!"
                }
            </p>
            <div class="score">
                ${nota}
                <small>/ 10</small>
            </div>
            <div class="percentage">
                ${porcentaje}% de aciertos
            </div>
            <div class="result-time">
                <span>
                    &#9201; Tiempo total
                </span>
                <strong>
                    ${formatTime(elapsedTime)}
                </strong>
            </div>
            <div class="result-stats">
                <div class="stat">
                    <strong>
                        ${ok}
                    </strong>
                    <span>
                        &#9989; Aciertos
                    </span>
                </div>
                <div class="stat">
                    <strong>
                        ${quiz.length - ok}
                    </strong>
                    <span>
                        &#10060; Fallos
                    </span>
                </div>
                <div class="stat">
                    <strong>
                        ${quiz.length}
                    </strong>
                    <span>
                        &#128202; Preguntas
                    </span>
                </div>
            </div>
            <div class="result-actions">
                ${
                    bad.length > 0
                        ? `
                            <button
                                class="start-btn"
                                type="button"
                                onclick="review()"
                            >
                                &#128257; Repasar falladas
                                (${bad.length})
                            </button>
                        `
                        : `
                            <div class="perfect">
                                &#11088; ¡Perfecto!
                                <br>
                                No tienes preguntas falladas.
                            </div>
                        `
                }
                <button
                    class="secondary-btn"
                    type="button"
                    onclick="backToSetup()"
                >
                    &larr; Volver a los temas
                </button>
            </div>
        </div>
    `;
}
// ======================================================
// REPASAR PREGUNTAS FALLADAS
// ======================================================
function review() {
    if (!bad.length) {
        alert("No tienes preguntas falladas.");
        return;
    }
    quiz = shuffle([...bad]);
    i = 0;
    ok = 0;
    bad = [];
    startTimer();
    show();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
// ======================================================
// VOLVER A LA SELECCIÓN DE TEMAS
// ======================================================
function backToSetup() {
    resetTimer();
    document.getElementById("setup").style.display = "block";
    document.getElementById("app").innerHTML = "";
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
// ======================================================
// FISHER-YATES SHUFFLE
// ======================================================
function shuffle(array) {
    const resultado = [...array];
    for (
        let posicion = resultado.length - 1;
        posicion > 0;
        posicion--
    ) {
        const posicionAleatoria = Math.floor(
            Math.random() * (posicion + 1)
        );
        [
            resultado[posicion],
            resultado[posicionAleatoria]
        ] = [
            resultado[posicionAleatoria],
            resultado[posicion]
        ];
    }
    return resultado;
}
// ======================================================
// ESCAPAR HTML
// ======================================================
function escapeHtml(valor) {
    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}