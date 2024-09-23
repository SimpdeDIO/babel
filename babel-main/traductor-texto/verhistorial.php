<?php
$host = 'localhost'; // Cambia si es necesario
$dbname = 'traducciones'; // Nombre de tu base de datos
$username = 'root'; // Tu usuario de base de datos
$password = ''; // Tu contraseña de base de datos

// Conexión a la base de datos
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->query("SELECT * FROM traducciones ORDER BY fecha DESC");
    $traducciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Error al conectar: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Traducciones Guardadas</title>
</head>
<body>
    <h1>Traducciones Guardadas</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Texto Original</th>
            <th>Texto Traducido</th>
            <th>Idioma</th>
            <th>Fecha</th>
        </tr>
        <?php foreach ($traducciones as $traduccion): ?>
        <tr>
            <td><?php echo $traduccion['id']; ?></td>
            <td><?php echo htmlspecialchars($traduccion['texto_original']); ?></td>
            <td><?php echo htmlspecialchars($traduccion['texto_traducido']); ?></td>
            <td><?php echo htmlspecialchars($traduccion['idioma']); ?></td>
            <td><?php echo $traduccion['fecha']; ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
