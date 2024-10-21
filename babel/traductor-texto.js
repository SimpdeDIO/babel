const abrir_btn = document.getElementById("abrir-menu");

function abrir() {
    nav.classList.add("visible");
}

function cerrar() {
    nav.classList.remove("visible");
}

const apiKey = 'AIzaSyBahhDaOWo0LEBjDFZP_Lfvc2GoL6uM2hY'; // Reemplaza con tu clave API
let languageMap = {};  // Mapeo de código de idioma a nombre de idioma

function traducir() {
    const apiUrl = 'https://translation.googleapis.com/language/translate/v2';
    const q = document.getElementById("textoUsuario").value;
    const result = document.getElementById("result");
    const targetLanguage = document.getElementById("language-select").value;
    const sourceLanguage = document.getElementById("idiomaDetectadoNombre").dataset.languageCode || 'auto';
    
    const formulario = document.getElementById("formulario-traduccion");
    const textoTraducido = document.getElementById("textoTraducido"); 
    const textoComun = document.getElementById("textoComun");
    const textoTraducidoForm = document.getElementById("textoTraducidoForm");

    const data = {
        q: q,
        source: sourceLanguage,
        target: targetLanguage
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey
        },
        body: JSON.stringify(data)
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error con la solicitud');
            }
            return response.json();
        })
        .then(data => {
            const translatedText = data.data.translations[0].translatedText;
            result.textContent = translatedText;  // Solo muestra la traducción
            textoTraducido.value = translatedText;  
            textoComun.value = q;  // Aquí se establece el valor oculto, no se debe mostrar en la pantalla
            textoTraducidoForm.value = translatedTextq;  

            return fetch(formulario.action, {
                method: formulario.method,
                body: new FormData(formulario)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al traducir el texto.');
        });
}

// Función para detectar automáticamente el idioma del texto
function detectarIdioma() {
    const apiUrlDetect = 'https://translation.googleapis.com/language/translate/v2/detect';
    const q = document.getElementById("textoUsuario").value;

    if (q.trim() === "") {
        document.getElementById("idiomaDetectadoNombre").textContent = 'N/A';
        return; 
    }

    const data = {
        q: q
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey
        },
        body: JSON.stringify(data)
    };

    fetch(apiUrlDetect, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.detections && data.data.detections[0]) {
                const detectedLanguage = data.data.detections[0][0].language;
                const languageDisplay = document.getElementById("idiomaDetectadoNombre");
                const detectedLanguageName = languageMap[detectedLanguage] || detectedLanguage;

                languageDisplay.textContent = `${detectedLanguageName}`;
                languageDisplay.dataset.languageCode = detectedLanguage; 
            } else {
                document.getElementById("idiomaDetectadoNombre").textContent = 'Error';
            }
        })
        .catch(error => {
            console.error('Error al detectar el idioma:', error);
            document.getElementById("idiomaDetectadoNombre").textContent = 'Error';
        });
}

// Función para cargar los idiomas disponibles de Google Cloud Translation y crear el mapeo
function cargarIdiomas() {
    const apiUrlLanguages = `https://translation.googleapis.com/language/translate/v2/languages?key=${apiKey}&target=es`; 

    fetch(apiUrlLanguages)
        .then(response => response.json())
        .then(data => {
            const targetSelect = document.getElementById('language-select');
            
            data.data.languages.forEach(language => {
                const optionTarget = document.createElement('option');
                optionTarget.value = language.language;
                optionTarget.textContent = language.name;
                targetSelect.appendChild(optionTarget);
                languageMap[language.language] = language.name;
            });
        })
        .catch(error => console.error('Error al obtener la lista de idiomas:', error));
}

// Función para invertir los idiomas de entrada y salida
function invertirIdiomas() {
    const targetSelect = document.getElementById('language-select');
    const sourceLanguageElement = document.getElementById("idiomaDetectadoNombre");

    const currentTargetLanguage = targetSelect.value;
    const currentSourceLanguage = sourceLanguageElement.dataset.languageCode || 'auto';

    targetSelect.value = currentSourceLanguage;
    sourceLanguageElement.dataset.languageCode = currentTargetLanguage;

    const newSourceLanguageName = languageMap[currentTargetLanguage] || currentTargetLanguage;
    sourceLanguageElement.textContent = `(${newSourceLanguageName})`;
}

// Cargar los idiomas al cargar la página
window.onload = cargarIdiomas;