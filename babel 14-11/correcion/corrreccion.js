document.getElementById("checkGrammar").addEventListener("click", () => {
    const inputText = document.getElementById("inputText").value;
    const outputDiv = document.getElementById("output");

    if (!inputText.trim()) {
        outputDiv.textContent = "Por favor, escribe un texto para corregir.";
        return;
    }

    // Realizamos la solicitud a la API de LanguageTool
    fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            text: inputText,
            language: "es" // Idioma: español
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.matches.length === 0) {
                outputDiv.textContent = "¡No se encontraron errores gramaticales!";
            } else {
                outputDiv.innerHTML = "<h3>Sugerencias de corrección:</h3>";
                data.matches.forEach(match => {

                    outputDiv.classList.add("visible");
                    outputDiv.innerHTML += `
                        <p>
                            <strong>Error:</strong> ${match.context.text}<br>
                            <strong>Sugerencia:</strong> ${match.replacements.map(rep => rep.value).join(", ")}
                        </p>
                    `;
                });
            }
        })
        .catch(error => {
            outputDiv.textContent = "Error al procesar el texto. Por favor, intenta de nuevo.";
            console.error("Error:", error);
        });
});
