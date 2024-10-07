<?php
$host = 'localhost'; // Cambia si es necesario
$dbname = 'tu_base_de_datos'; // Nombre de tu base de datos
$username = 'tu_usuario'; // Tu usuario de base de datos
$password = 'tu_contraseña'; // Tu contraseña de base de datos

// Conexión a la base de datos
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Obtener datos del POST
    $data = json_decode(file_get_contents('php://input'), true);
    $textoOriginal = $data['texto_original'];
    $textoTraducido = $data['texto_traducido'];
    $idioma = $data['idioma'];
    
    // Insertar en la base de datos
    $stmt = $pdo->prepare("INSERT INTO traducciones (texto_original, texto_traducido, idioma) VALUES (?, ?, ?)");
    $stmt->execute([$textoOriginal, $textoTraducido, $idioma]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
