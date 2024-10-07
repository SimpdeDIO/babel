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
    const targetLanguage = document.getElementById("language-select").value; // Obtener el idioma de destino
    const sourceLanguage = document.getElementById("idiomaDetectadoNombre").dataset.languageCode || 'auto'; // Obtener el idioma detectado o usar 'auto'
    const textoTra = document.getElementById("textoTra");
    const textoComun = document.getElementById("textoComun");
    const idiomInput = document.getElementById("idioma");




    console.log("Texto a traducir: " + q);
    console.log("Idioma de origen: " + sourceLanguage);
    console.log("Idioma de destino: " + targetLanguage);

    // Datos para la solicitud
    const data = {
        q: q,
        source: sourceLanguage, // Idioma de origen detectado automáticamente
        target: targetLanguage // Idioma de destino según selección del usuario
    };

    // Opciones de la solicitud
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey
        },
        body: JSON.stringify(data)
    };

    console.log("Datos de solicitud: ", data);

    // Enviar la solicitud
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error con la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta de la API: ", data);
            const translatedText = data.data.translations[0].translatedText;
            result.textContent = translatedText;
            textoTra.value= translatedText;
            textoComun.value = q;
            idiomInput.value = target;
            
        })
        .catch(error => {
            console.error('Error:', error);
            result.textContent = 'Error al traducir el texto.';
        });
}

// Función para detectar automáticamente el idioma del texto
function detectarIdioma() {
    const apiUrlDetect = 'https://translation.googleapis.com/language/translate/v2/detect';
    const q = document.getElementById("textoUsuario").value;

    if (q.trim() === "") {
        document.getElementById("idiomaDetectadoNombre").textContent = 'N/A';
        return; // No hay texto para detectar
    }

    // Datos para la solicitud de detección de idioma
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

    // Enviar la solicitud para detectar el idioma
    fetch(apiUrlDetect, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.detections && data.data.detections[0]) {
                const detectedLanguage = data.data.detections[0][0].language;
                const confidence = data.data.detections[0][0].confidence;

                // Obtener el nombre completo del idioma usando el mapeo
                const languageDisplay = document.getElementById("idiomaDetectadoNombre");
                const detectedLanguageName = languageMap[detectedLanguage] || detectedLanguage; // Usa el nombre completo si está en el mapeo, si no muestra el código

                // Actualizar el HTML con el nombre del idioma detectado
                languageDisplay.textContent = `${detectedLanguageName}`; // Mostrar el nombre completo del idioma
                languageDisplay.dataset.languageCode = detectedLanguage; // Almacenar el código del idioma detectado
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
    const apiUrlLanguages = `https://translation.googleapis.com/language/translate/v2/languages?key=${apiKey}&target=es`; // target=es para obtener nombres en español

    // Llamada para obtener los idiomas
    fetch(apiUrlLanguages)
        .then(response => response.json())
        .then(data => {
            const targetSelect = document.getElementById('language-select');
            
            // Itera sobre la lista de idiomas y los añade a la lista desplegable
            data.data.languages.forEach(language => {
                const optionTarget = document.createElement('option');
                optionTarget.value = language.language;
                optionTarget.textContent = language.name;
                targetSelect.appendChild(optionTarget);

                // Crear mapeo de código de idioma a nombre de idioma
                languageMap[language.language] = language.name;
            });
        })
        .catch(error => console.error('Error al obtener la lista de idiomas:', error));
}

// Función para invertir los idiomas de entrada y salida
function invertirIdiomas() {
    const targetSelect = document.getElementById('language-select');
    const sourceLanguageElement = document.getElementById("idiomaDetectadoNombre");
    
    // Obtener el idioma de destino actual
    const currentTargetLanguage = targetSelect.value;
    // Obtener el idioma de origen actual
    const currentSourceLanguage = sourceLanguageElement.dataset.languageCode || 'auto';
    
    // Cambiar el idioma de destino al idioma de origen y viceversa
    targetSelect.value = currentSourceLanguage;
    sourceLanguageElement.dataset.languageCode = currentTargetLanguage;
    
    // Actualizar el texto para mostrar el nombre completo del nuevo idioma de origen
    const newSourceLanguageName = languageMap[currentTargetLanguage] || currentTargetLanguage;
    sourceLanguageElement.textContent = `(${newSourceLanguageName})`;

    // Opcional: Limpiar el texto de entrada y el resultado
    document.getElementById("textoUsuario").value = "";
    document.getElementById("result").textContent = "";
}

// Cargar los idiomas al cargar la página
window.onload = cargarIdiomas;
