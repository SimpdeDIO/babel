<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'localhost';
$dbname = 'traducciones';
$username = 'root';
$password = '';


// Cargar el archivo y leer su contenido
if (isset($_FILES['archivo']) && $_FILES['archivo']['error'] == UPLOAD_ERR_OK) {
    $fileContent = file_get_contents($_FILES['archivo']['tmp_name']);
    $targetLanguage = $_POST['target_language'];

    // Función para traducir usando la API de Google Cloud
    function translateText($text, $targetLanguage) {
        $apiKey = 'AIzaSyBahhDaOWo0LEBjDFZP_Lfvc2GoL6uM2hY';
        $url = 'https://translation.googleapis.com/language/translate/v2?key=' . $apiKey;

        $data = [
            'q' => $text,
            'target' => $targetLanguage
        ];

        $options = [
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n",
                'content' => json_encode($data)
            ]
        ];
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        $response = json_decode($result, true);

        return $response['data']['translations'][0]['translatedText'];
    }

    // Traducir el contenido del archivo
    $translatedText = translateText($fileContent, $targetLanguage);

    // Crear un nuevo archivo con el contenido traducido
    $translatedFile = 'translated_' . $_FILES['archivo']['name'];
    file_put_contents($translatedFile, $translatedText);

    // Descargar el archivo traducido
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename=' . basename($translatedFile));
    header('Content-Length: ' . filesize($translatedFile));
    readfile($translatedFile);

    // Eliminar el archivo temporal
    unlink($translatedFile);
    exit;
} else {
    echo "Error al cargar el archivo.";
}


// Cierra la conexión
$stmt->close();
$conexion->close();


?>
