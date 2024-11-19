<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="main.css">
    

</head>
<body>
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
<section class="main">
    <div class="celular-caja">

     <!--------- menu hamburguesa -------------->
     <div class="encabezado">
        <button onclick="abrir()" class="abrir-menu" id="abrir-menu"><i class="bi bi-three-dots-vertical"></i></button>
        <nav class="navbar" id="nav" >
            <div class="cerrar-btn-cont"><button onclick="cerrar()" class="cerrar-menu" id="cerrar-menu"><i class="bi bi-x-lg"></i></button></div>
        
            <div class="perfil-img-cont">
                <img id="perfil-img" src="../img/usuario.png" alt="">
            </div>
            <ul class="nav-list">
                <li><a href="../menu-hamburguesa/cuenta.php"><button><p>Cuenta</p></button></a></li>
                <li><a href="../menu-hamburguesa/idiomas.html"><button><p>Idiomas</p></button></a></li>
                <li><a href="../menu-hamburguesa/reporte.html"><button><p>Reportar un problema</p></button></a></li>
                <li><a href="../inicio-sesion/inicioSesion.html"><button><p>Iniciar sesion</p></button></a></li>  
                <li><a href="../inicio-sesion/registro.html"><button><p>Registrarse</p></button></a></li> 
                <li><a href="../menu-hamburguesa/config.html"><button><p>Configuración</p></button></a></li>   
            </ul>
        </nav>
    </div>
        <div class="welcome-title"><h1>Bienvenido/a a BABEL, <?php echo $dato['nombre']?></h1></div>
        <div class="welcome-logo-cont"><img id="welcome-img" src="../img/logo.png" alt=""></div>
        <div class="cajas-cont">
            <div class="caja">
                <a href="../traductor-texto.html"><button>Traducir a texto</button></a>
            </div>
            <div class="caja">
                <a href="../traductor/traductor.html"><button>Traducir a voz</button></a>
            </div>
            <div class="caja-chat">
                <a href="../verhistorial.php"><button>Historial de traducciones</button></a>
            </div>
            <div class="caja-chat">
                <a href="../correcion/correccion.html"><button>Corrección de textos</button></a>
            </div>
            <div class="caja-chat">
                <a href="../archivos/archivos.html"><button>Traducción de archivos</button></a>
            </div>
            <div class="caja-chat">
                <a href="#"><button>Cámara</button></a>
            </div>
        </div>
        

        </div>
    </div>
</section>

<script src="main.js">

</script>

</body>
</html>
















































<!-------------- FRANCO EL 10 CARREO TODO EL TRABAJO!!!------------------------------>