<?php
include_once 'JWT.php';
include_once 'ExpiredException.php';
include_once 'BeforeValidException.php';
include_once 'SignatureInvalidException.php';
require_once("Usuarios.php");
$objDatos = json_decode(file_get_contents("php://input"));

//var_dump($objDatos);
//$idUsuario = Usuario::ChequearUsuario($objDatos->usuario,$objDatos->clave);

//1 - tomo datos del http
//2 - verifico con un método de la clase usuario si son datos válidos
//3 - de ser válidos creo el token y lo retorno
$correcto= false ;
$usuarios=usuario::TraerTodosLosUsuarios();
	foreach($usuarios as $usuario)
	{
		if($usuario->nombre==$objDatos->usuario && $usuario->clave==$objDatos->clave )/*&& $usuario["mail"]==$respuesta->mail*/
		{
			$correcto=true;
			$userAux=$usuario;
			break;
		}
	}
	if($correcto)
	{
		$token=Array
		("exp"=>time()+10000,
		//"id"=>$user["id"],
		"id"=>$userAux->id,
		//"nombre"=>$userAux["nombre"],
		"nombre"=>$userAux->nombre,
		//"pass"=>$userAux["pass"], No se pasa el pass para no comprometer la cuenta del usuario.
		//"correo"=>$userAux["correo"]);
		"correo"=>$userAux->correo);
		$token=Firebase\JWT\JWT::encode($token, "mytoken2016");
		$array["mytoken2016"]=$token;
		echo json_encode($array);
	}
	else
	{
		echo false;
	}

?>