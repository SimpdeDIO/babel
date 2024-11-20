<?php 
$conexion = mysqli_connect('localhost','root','','traducciones');

$user = $_POST["user"];
$contra = $_POST["contra"];



$consulta = "select * from usuario where correo = '$user' and contraseña = '$contra'";

$resultado = mysqli_query($conexion,$consulta);



if (mysqli_num_rows($resultado) > 0) {
    session_start();
    $_SESSION['datos_columna'] = array();

    while($row = $resultado -> fetch_assoc()) {
        
        $_SESSION['datos_columna'][] = $row;
    }
    echo "Bienvenido!!!";

   
    $_SESSION["user"] = $user;
    $usuario =$_SESSION["user"] ;
 
    header('Location: ../main-page/main.php');
} else {
    echo "Usuario o contraseña incorrecta. <a href='inicioSesion.html'>Intentar de nuevo</a>";
}

?>