const API_KEY = 'AIzaSyBahhDaOWo0LEBjDFZP_Lfvc2GoL6uM2hY'; // Reemplaza con tu clave API de Google
const languageMap = {}; // Mapeo de códigos de idioma a nombres

const nav = document.querySelector("nav");
const abrir_btn = document.getElementById("abrir-menu");
const btnStartStop = document.getElementById('microfono-btn');
const textArea = document.getElementById('textArea');
const detectedLanguageEl = document.getElementById('idioma-detectado');
const languageSelect = document.getElementById('language-select');

function abrir() {
    nav.classList.add("visible");
}

function cerrar() {
    nav.classList.remove("visible");
}

// Función para llenar el menú desplegable con los idiomas disponibles
function cargarIdiomas() {
    const apiUrlLanguages = `https://translation.googleapis.com/language/translate/v2/languages?key=${API_KEY}&target=es`;

    fetch(apiUrlLanguages)
        .then(response => response.json())
        .then(data => {
            const targetSelect = document.getElementById('language-select');
            targetSelect.innerHTML = ''; // Limpiar opciones existentes

            data.data.languages.forEach(language => {
                const optionTarget = document.createElement('option');
                optionTarget.value = language.language;
                optionTarget.textContent = language.name;
                targetSelect.appendChild(optionTarget);

                // Crear mapeo de código de idioma a nombre de idioma
                languageMap[language.language] = language.name;
            });

            // Inicializar Select2
            $('#language-select').select2({
                placeholder: 'Selecciona un idioma',
                width: '100%'
            });
        })
        .catch(error => console.error('Error al obtener la lista de idiomas:', error));
}

async function detectAndTranslate(texto) {
    const apiUrlDetect = 'https://translation.googleapis.com/language/translate/v2/detect';
    
    const data = { q: texto };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': API_KEY
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(apiUrlDetect, requestOptions);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        const detectedLanguage = data.data.detections[0][0].language;
        detectedLanguageEl.textContent = `Idioma Detectado: ${languageMap[detectedLanguage] || detectedLanguage}`;
        traducir(texto, detectedLanguage);
    } catch (error) {
        console.error('Error detectando el idioma:', error);
    }
}

async function traducir(texto, detectedLanguage) {
    const targetLanguage = languageSelect.value || 'es'; // Traducir al idioma seleccionado en el desplegable o al español por defecto
    const apiUrlTranslate = 'https://translation.googleapis.com/language/translate/v2';
    
    const data = {
        q: texto,
        source: detectedLanguage,
        target: targetLanguage
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': API_KEY
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(apiUrlTranslate, requestOptions);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        const translatedText = data.data.translations[0].translatedText;
        textArea.textContent = translatedText;
    } catch (error) {
        console.error('Error en la traducción:', error);
    }
}

btnStartStop.addEventListener('click', () => {
    if (isRecognizing) {
        recognition.stop();
    } else {
        recognition.start();
    }
});

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = false;
let isRecognizing = false;

recognition.onstart = () => {
    isRecognizing = true;
};

recognition.onend = () => {
    isRecognizing = false;
};

recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1][0];
    const texto = result.transcript;
    console.log("Texto reconocido: " + texto);
    detectAndTranslate(texto);
};

// Inicializar el menú de idiomas
cargarIdiomas();

const saveTranslationBtn = document.querySelector('.downnav-btn.boton-lista:last-child'); // Selecciona el botón "Guardar traducción"

saveTranslationBtn.addEventListener('click', () => {
    const textoOriginal = textArea.textContent; // Texto traducido
    const idioma = languageSelect.value; // Idioma seleccionado

    // Enviar datos a PHP
    fetch('guardar_traduccion.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ texto_original: textoOriginal, texto_traducido: textoOriginal, idioma: idioma })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Traducción guardada con éxito!');
        } else {
            alert('Error al guardar la traducción.');
        }
    })
    .catch(error => console.error('Error al guardar la traducción:', error));
});
