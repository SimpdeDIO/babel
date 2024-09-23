<?php
$host = 'localhost'; // Cambia si es necesario
$dbname = 'traducciones'; // Nombre de tu base de datos
$username = 'root'; // Tu usuario de base de datos
$password = ''; // Tu contraseña de base de datos

// Conexión a la base de datos
try {
    $idiom = $_POST("idioma");
    $textComun = $_POST("textoComun");
    $textTra= $_POST("textoTra");
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->query("INSERT INTO traducciones (texto_original, texto_traducido, idioma) VALUES
('$textComun', '$_textTra', '$idiom'),");
    $traducciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Error al conectar: " . $e->getMessage());
}
?>
