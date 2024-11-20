

 <?php 

   
    session_start();
   $usuario= $_SESSION["user"] ;
   $datos = $_SESSION['datos_columna'];
   foreach($datos as $dato) {
   //Codigo magico para obtener datos del usuario echo $dato['nombre'];
   };
 if ($usuario == "") {
    header("location: ../inicio-sesion/inicioSesion.html");
        
    }else{
       
    }

    ?>
    <?php 
$conexion = mysqli_connect('localhost','root','','traducciones');

//guardarmos datos

$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$correo = $_POST['correo'];
$contraseña = $_POST['contraseña'];
$imagen = addslashes(file_get_contents($_FILES["imagen"]["tmp_name"]));
$id = $dato['id'];

$consulta = "update usuario set nombre='$nombre', apellido='$apellido', correo='$correo', contraseña='$contraseña'
             where id='$id'";   

$resultado = mysqli_query($conexion,$consulta);

if($resultado){
    echo"se actualizaron los datos";

    // header('Location: ../inicio-sesion/inicioSesion.html');
}else{
    echo"no se pudo actualizar";
}





?>