<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'localhost';
$dbname = 'traducciones';
$username = 'root';
$password = '';

// Captura los datos enviados desde el formulario
$textoComun = $_POST['textoComun'];
$textoTra = $_POST['textoTraducido'];

// Verifica que los valores no estén vacíos
if(empty($textoComun) || empty($textoTra)) {
    echo json_encode(['status' => 'error', 'message' => 'Campos vacíos']);
    exit;
}

// Crear la conexión a la base de datos
$conexion = new mysqli($host, $username, $password, $dbname);

// Verifica si hubo un error de conexión
if ($conexion->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Conexión fallida: ' . $conexion->connect_error]));
} else {
    echo json_encode(['status' => 'success', 'message' => 'Conexión exitosa']);
}


// Sentencia preparada para insertar los datos
$sql = "INSERT INTO traducciones (textoriginal, textotraducido, fecha) VALUES (?, ?, CURRENT_DATE)";

// Prepara la consulta
$stmt = $conexion->prepare($sql);

// Vincula los parámetros a la sentencia (s = string)
$stmt->bind_param('ss', $textoComun, $textoTra);

if ($stmt->execute()) {

    header("Location: traductor-texto.html");

    
    echo json_encode(['status' => 'success', 'message' => 'Se ha insertado correctamente']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al insertar: ' . $stmt->error]);
}
// Cierra la conexión
$stmt->close();
$conexion->close();


?>
