<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="./config-main.css">
    <link rel="stylesheet" href="cuenta.css">
</head>
<body>
    
<?php 
    session_start();
   $usuario= $_SESSION["user"] ;
   $datos = $_SESSION['datos_columna'];
   foreach($datos as $dato) {
   //Codigo magico para obtener datos del usuario echo $dato['nombre'];
   }; ?>

<section class="main">
    <div class="celular-caja">
        <div class="header">
            <a href="../main-page/main.php"><button class="atras-btn"><i class="bi bi-arrow-left"></i></button></a>
            <h4>Ajustes de la cuenta</h4>
        </div>

        <div class="config-cont">
            
            <div class="config-list">
                <form action="">

                <p>Nombre</p>
                <div class="config-block">
                    <input type="text" value='<?php echo $dato['nombre'] ?>'>
                    
                </div>

                <p>Apellido</p>

                <div class="config-block">
                <input type="text" value='<?php echo $dato['apellido']    ?>'>
                </div>

                <p>Correo electronico</p>
                <div class="config-block">
                <input type="text" value='<?php echo $dato['correo']    ?>'>
                </div>
                
                <p>Constraseña</p>
                <div class="config-block">
                <input type="text" value='<?php echo $dato['contraseña']    ?>'>
                </div>

</form>



                
            </div>
        </div>
    </div>
</section>
</body>
</html>