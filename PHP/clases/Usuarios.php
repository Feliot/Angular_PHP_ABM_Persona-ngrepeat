<?php
	require_once("AccesoDatos.php");
	//require_once("conexion.php");
	class usuario
	{
		public $_id;
		public $_correo;
		public $_nombre;
		public $_clave;
		public $_tipo;
		public $_foto;
		// public $id;
		// public $correo;
		// public $nombre;
		// public $clave;
		// public $tipo;
		// public $foto;
		// public function __construct($id, $correo, $nombre, $clave, $tipo, $foto)
		// {
		// 	$this->_id=$id;
		// 	$this->_correo=$correo;
		// 	$this->_nombre=$nombre;
		// 	$this->_clave=$clave;
		// 	$this->_tipo="empleado";
		// 	$this->_foto=$foto;
		// }

		public function __construct($id=null)
		{
			if($id != NULL){
			$obj = usuario::TraerUnUsuario($id);
			$this->_id=$id;
			$this->_correo=$obj->correo;
			$this->_nombre=$obj->nombre;
			$this->_clave=$obj->clave;
			$this->_tipo="empleado";
			$this->_foto=$obj->foto;
		    }
		}

		 public static function TraerUnUsuario($idParametro) 
	  	 {	
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios where id =:id");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnProducto(:id)");
			$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
			$consulta->execute();
			$productoBuscado= $consulta->fetchObject('usuario');
			return $productoBuscado;						
	   	 }

		public static function ToArray()
		{
			$conexion=Conexion::AccederDatos();
			$sentencia=$conexion->Prepare("SELECT * FROM usuarios");
			$sentencia->Execute();
			$usuarios=$sentencia->fetchAll(PDO::FETCH_ASSOC);
			$conexion=null;
			return $usuarios;
		}
		public static function BuscarUsuario($id)
		{
			$conexion=Conexion::AccederDatos();
			$sentencia=$conexion->Prepare("SELECT * FROM usuarios WHERE id=:id");
			$sentencia->bindValue(":id", $id, PDO::PARAM_INT);
			$sentencia->Execute();
			$usuario=$sentencia->fetchAll(PDO::FETCH_ASSOC);
			$conexion=null;
			return $usuario;
		}
		public function InsertarUsuario()
		{
			$conexion=Conexion::AccederDatos();
			$sentencia=$conexion->Prepare("INSERT INTO usuarios(correo, nombre, clave, tipo, foto) VALUES (:correo, :nombre, :clave, :tipo, :foto)");
			$sentencia->bindValue(":correo", $this->_correo, PDO::PARAM_STR);
			$sentencia->bindValue(":nombre", $this->_nombre, PDO::PARAM_STR);
			$sentencia->bindValue(":clave", $this->_clave, PDO::PARAM_STR);
			$sentencia->bindValue(":tipo", $this->_tipo, PDO::PARAM_STR);
			$sentencia->bindValue(":foto", $this->_foto, PDO::PARAM_STR);
			$sentencia->Execute();
			$conexion=null;
		}
		public function ModificarUsuario()
		{
			$conexion=Conexion::AccederDatos();
			$sentencia=$conexion->Prepare("UPDATE usuarios SET correo=:correo, nombre=:nombre, clave=:clave, tipo=:tipo, foto=:foto WHERE id=:id");
			$sentencia->bindValue(":id", $this->_id, PDO::PARAM_INT);
			$sentencia->bindValue(":correo", $this->_correo, PDO::PARAM_STR);
			$sentencia->bindValue(":nombre", $this->_nombre, PDO::PARAM_STR);
			$sentencia->bindValue(":clave", $this->_clave, PDO::PARAM_STR);
			//$sentencia->bindValue(":tipo", $this->_clave, PDO::PARAM_STR);
			$sentencia->bindValue(":tipo", $this->_tipo, PDO::PARAM_STR);
			$sentencia->bindValue(":foto", $this->_foto, PDO::PARAM_STR);
			$sentencia->Execute();
			$conexion=null;
		}
		public static function EliminarUsuario($id)
		{
			$conexion=Conexion::AccederDatos();
			$sentencia=$conexion->Prepare("DELETE FROM usuarios WHERE id=:id");
			$sentencia->bindValue(":id", $id, PDO::PARAM_INT);
			$sentencia->Execute();
			$conexion=null;
		}

		 public static function TraerTodosLosUsuarios()
	   {
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasProductos() ");
		$consulta->execute();			
		$arrProductos= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		return $arrProductos;
	  }
//********************Geters y Seters*******************
		public function getId()
		{
			return $this->_id;
		}

		public function getTipo()
		{
			return $this->_tipo;
		}

		public function getFoto()
		{
			return $this->_foto;
		}

		public function getMail()
		{
			return $this->_correo;
		}
		public function getUser()
		{
			return $this->_nombre;
		}
		public function getPass()
		{
			return $this->_clave;
		}
		public function setId($value)
		{
			$this->_id=$value;
		}
		public function setMail($value)
		{
			$this->_correo=$value;
		}
		public function setUser($value)
		{
			$this->_nombre=$value;
		}
		public function setPass($value)
		{
			$this->_clave=$value;
		}

		public function setTipo($value)
		{
			$this->_tipo=$value;
		}

		public function setFoto($value)
		{
			$this->_foto=$value;
		}
		
	}
?>