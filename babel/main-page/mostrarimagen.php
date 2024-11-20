<?php
// Estilos CSS
echo '<style>
    .user-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>';

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "traducciones";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Iniciar sesión y validar
session_start();
$usuario= $_SESSION["user"] ;
$datos = $_SESSION['datos_columna'];
foreach($datos as $dato) {
 $imagen =$dato['imagen'];
//Codigo magico para obtener datos del usuario echo $dato['nombre'];
};

// Obtener el usuario actual
$usuario = $_SESSION['user'];
$id = $_SESSION['id'] ?? null; // Asegúrate de que se haya almacenado el ID correctamente

if (!$id) {
    die("Error: No se encontró el ID del usuario.");
}

// Consulta SQL segura con prepared statements
$stmt = $conn->prepare("SELECT imagen FROM usuario WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $img = $row['imagen'];

    // Mostrar la imagen en formato base64
    echo "<img src='data:image/jpeg;base64," . base64_encode($img) . "' class='user-image'>";
} else {
    echo "Imagen no encontrada.";
}

$stmt->close();
$conn->close();
?>
