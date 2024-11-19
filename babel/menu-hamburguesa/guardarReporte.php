<?php 
$conexion = mysqli_connect('localhost','root','','traducciones');

//guardarmos datos

$reporte = $_POST['problema'];

$consulta = "insert into reportes(reporte)
             value ('$reporte')";

$resultado = mysqli_query($conexion,$consulta);

if($resultado){
    
    header('Location: ../inicio-sesion/inicioSesion.html');
}else{
    echo"no se pudo registrar cliente";
}





?>