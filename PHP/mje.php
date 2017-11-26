<?PHP
include "clases/Personas.php";
//echo "../". DIRECTORY_SEPARATOR . 'fotos' . DIRECTORY_SEPARATOR ;
	$listado=persona::TraerTodasLasPersonas();
    //$response->write(json_encode($listado));
    echo json_encode($listado);
        //return write(json_encode($listado));
?>