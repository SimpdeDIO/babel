<?php 
$conexion = mysqli_connect('localhost','root','','traducciones');

$user = $_POST["user"];
$contra = $_POST["contra"];

$consulta = "select * from usuario where correo = '$user' and contraseña = '$contra'";

$resultado = mysqli_query($conexion,$consulta);


if (mysqli_num_rows($resultado) > 0) {
    echo "Bienvenido!!!";
    header('Location: ../main page/main.html');
} else {
    echo "Usuario o contraseña incorrecta. <a href='inicioSesion.html'>Intentar de nuevo</a>";
}

?>