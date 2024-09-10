const nav = document.querySelector("nav");
const abrir_btn = document.getElementById("abrir-menu");

function abrir() {
    nav.classList.add("visible");
}

function cerrar() {
    nav.classList.remove("visible");
}

// Microfono
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
    
    console.log("Texto reconocido: " + texto);

    detectarIdioma(texto);
    
};

// Función para detectar el idioma usando la API de Google Translate
function detectarIdioma(texto) {
    const apiUrl = 'https://translation.googleapis.com/language/translate/v2/detect';
    
    const data = {
        q: texto
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': 'AIzaSyBahhDaOWo0LEBjDFZP_Lfvc2GoL6uM2hY' // Clave API de Google
        },
        body: JSON.stringify(data)
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud de detección de idioma');
            }
            return response.json();
        })
        .then(data => {
            const detectedLanguage = data.data.detections[0][0].language;
            console.log("Idioma detectado: " + detectedLanguage);
           traducir(texto,detectedLanguage);
            // Aquí puedes agregar una lógica adicional si deseas hacer algo con el idioma detectado
        })
        .catch(error => {
            console.error('Error detectando el idioma:', error);
        });

       
}
function traducir(texto,detectedLanguage) {
    console.log("se lanzo la funcion");
    const apiUrl = 'https://translation.googleapis.com/language/translate/v2';
    const q = texto;
    const b = detectedLanguage;
    const result = textArea;
    //const lenguaje = detectedLanguage;

    console.log("Cargo: " + q);

    // Datos para la solicitud
    const data = {
        q: q,
        source: b,

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
