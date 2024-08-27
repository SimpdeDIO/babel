const nav = document.querySelector("nav");
const abrir_btn = document.getElementById("abrir-menu");

function abrir() {
    nav.classList.add("visible");
}

function cerrar() {
    nav.classList.remove("visible");
}

function traducir() {
    const apiUrl = 'https://translation.googleapis.com/language/translate/v2';
    const q = document.getElementById("textoUsuario").value;
    const result = document.getElementById("result");

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