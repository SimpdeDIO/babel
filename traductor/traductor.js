const nav = document.querySelector("nav");
const abrir_btn = document.getElementById("abrir-menu");


function abrir() {
    nav.classList.add("visible");
}

function cerrar() {
    nav.classList.remove("visible");
}





//          microfono

const btnStartStop = document.getElementById('microfono-btn');
const textArea = document.getElementById('textArea');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.continuous = true;
recognition.interimResults = false;
let isRecognizing = false;
let currentLang = 'es-ES'; 
function setLanguage(lang) {
    recognition.lang = lang;
    currentLang = lang;
}

const languages = {
    'Español': 'es-ES',
    'Inglés': 'en-US',
    'Francés': 'fr-FR',
    'Alemán': 'de-DE'
};


btnStartStop.addEventListener('click', () => {
    if (isRecognizing) {
        recognition.stop();
    } else {
        recognition.start();
    }
});

recognition.onstart = () => {
    isRecognizing = true;
};

recognition.onend = () => {
    isRecognizing = false;
};

recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1][0];
    const texto = result.transcript;

    // textArea.value = texto;
    textArea.textContent = texto
    leerTexto(texto);
};

function leerTexto(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 0.4;
    speech.lang = currentLang;
    window.speechSynthesis.speak(speech);
}

function traducir() {
    const apiUrl = 'https://translation.googleapis.com/language/translate/v2';
    const q = texto.value;
    const result = textArea;

    console.log("Cargo: " + q);

    // Datos para la solicitud
    const data = {
        q: q,
        source: 'en',
        target: 'es'
    };

    // Opciones de la solicitud
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': ''
        },
        body: JSON.stringify(data)
    };

    console.log("Data: " + data.q);

    // Enviar la solicitud
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error con la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log("Response: " + data);
            const translatedText = data.data.translations[0].translatedText;
            result.textContent = translatedText;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}