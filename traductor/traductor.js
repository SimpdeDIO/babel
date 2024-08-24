const nav = document.querySelector("nav");
const abrir_btn = document.getElementById("abrir-menu");
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
    textArea.value = texto;
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