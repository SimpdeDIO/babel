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
    <
    <link rel="stylesheet" href="historial.css">
    <title>Traducciones Guardadas</title>

    <style>
        body{
    border: none;
    margin: 0;
    padding: 0;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
  background-color: var(--azul);


 
}

:root{
    --azul: #1F43DB;
}


.header{
    padding: 10px;
    display: flex;
    align-items: center;
}


.atras-btn{
    border-radius: 50%;
    padding: 8px 10px;
    border: none;
    width: 40px;
    height: 38px;
    font-size: 20px;
    color: white;
    background-color: transparent;
    text-align: center;
    margin-right: 10px;
}

.atras-btn:active{
    background-color: #3048b8;
}

.all{
    display: flex;
    justify-content: center;
    align-items: center;
}

.allcont{

    margin-top: 30px;

    background-color: rgba(31, 67, 219, 0.8) ;
    
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 50px 50px;

    border-radius: 15px;
    
}

.titulo{
    text-align:center;
}



.tablecont{
    display:flex;
    justify-content:center;
    margin: 10px;

}


    </style>
</head>
<body>

<section class="allcont">
    <h1 class="titulo">Traducciones Guardadas</h1>
    <div class="tablecont">
    <table>
        <tr>
           
            <th class="table-data">Texto Original</th>
            <th class="table-data">Texto Traducido</th>
           
            <th class="table-data">Fecha</th>
        </tr>
        <?php foreach ($traducciones as $traduccion): ?>
        <tr>
            
            <td class="table-data"><?php echo htmlspecialchars($traduccion['textoriginal']); ?></td>
            <td class="table-data"><?php echo htmlspecialchars($traduccion['textotraducido']); ?></td>
            <td class="table-data"><?php echo $traduccion['fecha']; ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
    </div>
</section>
</body>
</html>
