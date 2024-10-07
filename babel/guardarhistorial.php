<?php
$host = 'localhost'; // Cambia si es necesario
$dbname = 'traducciones'; // Nombre de tu base de datos
$username = 'root'; // Tu usuario de base de datos
$password = ''; // Tu contraseña de base de datos

$textoComun =$_POST['textoComun'];
$textoTra =$_POST['textoTra'];

$conexion = mysqli_connect($host,$username,$password,$dbname);
$sql= ("INSERT INTO traducciones (textoriginal, textotraducido, fecha)
VALUES ('$textoComun', '$textoTra', CURRENT_DATE);");
$resultado = mysqli_query($conexion, $sql);
if ($resultado) {
    echo "Se ha insertado correctamente";
}else{
    echo "Error al insertar";
}




?>
