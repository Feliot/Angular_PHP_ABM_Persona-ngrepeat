<?PHP
include "clases/Usuarios.php";
//echo "../". DIRECTORY_SEPARATOR . 'fotos' . DIRECTORY_SEPARATOR ;
	$listado=usuario::TraerTodosLosUsuarios();
    //$response->write(json_encode($listado));
    echo json_encode($listado);
        //return write(json_encode($listado));
?>