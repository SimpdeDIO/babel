<?php 
$conexion = mysqli_connect('localhost','root','','traducciones');

//guardarmos datos

$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$correo = $_POST['correo'];
$contraseña = $_POST['contraseña'];

$consulta = "insert into usuario(nombre, apellido, correo, contraseña)
             value ('$nombre','$apellido','$correo','$contraseña')";

$resultado = mysqli_query($conexion,$consulta);

if($resultado){
    
    header('Location: ../inicio-sesion/inicioSesion.html');
}else{
    echo"no se pudo registrar cliente";
}





?>