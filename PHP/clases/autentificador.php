<?php
include_once 'JWT.php';
include_once 'ExpiredException.php';
include_once 'BeforeValidException.php';
include_once 'SignatureInvalidException.php';

$objDatos = json_decode(file_get_contents("php://input"));

//$idUsuario = Usuario::ChequearUsuario($objDatos->usuario,$objDatos->clave);

//1 - tomo datos del http
//2 - verifico con un método de la clase usuario si son datos válidos
//3 - de ser válidos creo el token y lo retorno

 if($objDatos->usuario=="Demian" && $objDatos->clave=="666")
 {
 	$idUsuario = 1;
 	echo "pepe"
 }
 else
 {
 	$idUsuario = false;
 }

if($idUsuario==false)
 {
    $token = array(
					/*"id" => $usuario->id,
					"nombre" => $usuario->nombre,
					"perfil" => $usuario->perfil,
					"exp" => time() + 96000,*/
					"id" => "321",
					"nombre" => "Demian",
					"perfil" => "Administrador",
					"exp" => time() - 96000

				  );

	 $token = Firebase\JWT\JWT::encode($token, 'qwertyuiop6102');
	 // token ya terminado
	 $array['tokenTest2016'] = $token;
	 echo json_encode($array);
 }	
 else 
 {
	 $token = array(
					/*"id" => $usuario->id,
					"nombre" => $usuario->nombre,
					"perfil" => $usuario->perfil,
					"exp" => time() + 96000,*/
					"id" => "321",
					"nombre" => "Demian",
					"perfil" => "Administrador",
					"exp" => time() + 96000

				  );

	 $token = Firebase\JWT\JWT::encode($token, 'qwertyuiop6102');
	 // token ya terminado
	 $array['tokenTest2016'] = $token;
	 echo json_encode($array);
 }



?>