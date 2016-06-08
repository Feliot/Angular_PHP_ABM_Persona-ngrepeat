
var app = angular.module('ABMangularPHP', ['ngAnimate','ui.router','angularFileUpload','satellizer'])



.config(function($stateProvider, $urlRouterProvider,$authProvider) {

  
  $authProvider.loginUrl = 'Angular_PHP_ABM_Persona-ngrepeat/PHP/clases/autentificador.php';
  $authProvider.signupUrl = 'Angular_PHP_ABM_Persona-ngrepeat/PHP/clases/autentificador.php';
  $authProvider.tokenName = 'mytoken2016';
  $authProvider.tokenPrefix = 'ABM_Persona';
  $authProvider.authHeader = 'Data';



  $stateProvider

 


.state('menu', {
    views: {
      'principal': { templateUrl: 'template/menu.html',controller: 'controlMenu' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }
    ,url:'/menu'
  })
.state('login', {
   views: {
      'principal': { templateUrl: 'template/templateLoguin.html',controller: 'controlLoguin' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }, url: "/login"
    })
.state('grilla', {
    url: '/grilla',
    views: {
      'principal': { templateUrl: 'template/templateGrilla.html',controller: 'controlGrilla' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }
  })
  .state('alta', {
    url: '/alta',
    views: {
      'principal': { templateUrl: 'template/templateUsuario.html',controller: 'controlAlta' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }
  })
  .state('modificar', {
    url: '/modificar/{id}?:nombre:apellido:dni:foto',
     views: {
      'principal': { templateUrl: 'template/templateUsuario.html',controller: 'controlModificacion' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login'); //cuando se haga el login feemplazar /menu por /login
});


app.controller('controlLoguin', function($scope, $http, $auth, $state) {
   $scope.logear=function() {

    var mail = $scope.usuario.mail;
    var nombre = $scope.usuario.nombre;
    var pass = $scope.usuario.password;
     console.info("respuesta del loguin1", pass , nombre);
      $auth.login({usuario:nombre,clave:pass})
      .then(function(respuestadeauth){
      console.info("respuesta del loguin",respuestadeauth);
      console.info("respuesta del loguinasda",$auth.isAuthenticated());
      if($auth.isAuthenticated())
      {
        $state.go('menu');
      }
      else
        {
          $state.go('login');  
        }
      //  console.info("datos auth en menu", $auth.isAuthenticated(),$auth.getPayload());
    }).catch(function(parametro){
      console.info("ERROR", parametro);
   });//fin catch
  };//fin logear
});//fin del  controlLoguin

app.controller('controlLogout',function($scope,$http,$auth,$state){
  if(!$auth.isAuthenticated())
  {
    $state.go('login');
  }
  $auth.logout()
  .then(function(){
  });
});//fin logout

app.controller('controlMenu', function($scope, $http, $auth, $state) {
  $scope.DatoTest="**Menu**";
 /*if($auth.isAuthenticated())
  {
    $state.go('alta');
  }
  else
    {
      $state.go('menu');
    }

  $auth.login({usuario:"pepito",clave:"666"});
  $scope.DatoTest="**Menu**";
  console.info("datos auth en menu", $auth.isAuthenticated(),$auth.getPayload());*/
});



app.controller('controlAlta', function($scope, $http ,$state,FileUploader,cargadoDeFoto) {
  $scope.DatoTest="**alta**";

  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
  $scope.uploader.queueLimit = 1;

//inicio las variables
  $scope.persona={};
  $scope.persona.nombre= "natalia" ;
  $scope.persona.dni= "12312312" ;
  $scope.persona.apellido= "natalia" ;
  $scope.persona.foto="pordefecto.png";
  
  cargadoDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);
 


  $scope.Guardar=function(){
  console.log($scope.uploader.queue);
  if($scope.uploader.queue[0].file.name!='pordefecto.png')
  {
    var nombreFoto = $scope.uploader.queue[0]._file.name;
    $scope.persona.foto=nombreFoto;
  }
  $scope.uploader.uploadAll();
    console.log("persona a guardar:");
    console.log($scope.persona);
  }
   $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    //alert($scope.persona.foto);
      $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
        .then(function(respuesta) {       
           //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);
         $state.go("grilla");

      },function errorCallback(response) {        
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };
});


app.controller('controlGrilla', function($scope, $http,$location,$state,factoryPersona) {
  	$scope.DatoTest="**grilla**";

console.log(factoryPersona.nombre);
//factoryPersona.mostrarNombre("Molina");
 factoryPersona.TraerListado().then(function(carga){
  $scope.ListadoPersonas=  carga;
});
console.log(factoryPersona.nombre);
$scope.guardar = function(persona){

console.log( JSON.stringify(persona));
  $state.go("modificar, {persona:" + JSON.stringify(persona)  + "}");
}
 //	$http.get('PHP/nexo.php', { params: {accion :"traer"}})
  /*$http.get('http://localhost:8080/Angular_PHP_ABM_Persona-ngrepeat/Datos/Persona')// el nombre completro de la pagina
 	
  .then(function(respuesta) {     	

      	 $scope.ListadoPersonas = respuesta.data;
      	 console.log(respuesta.data);

    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log( response);     
 	 });*/
  
 	$scope.Borrar=function(persona){
		console.log("borrar"+persona);
    $http.post("PHP/nexo.php",{datos:{accion :"borrar",persona:persona}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
         .then(function(respuesta) {       
                 //aca se ejetuca si retorno sin errores        
                 console.log(respuesta.data);
                    $http.get('PHP/nexo.php', { params: {accion :"traer"}})
                    .then(function(respuesta) {       

                           $scope.ListadoPersonas = respuesta.data.listado;
                           console.log(respuesta.data);

                      },function errorCallback(response) {
                           $scope.ListadoPersonas= [];
                          console.log( response);
                          
                     });

          },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
              console.log( response);           
      });
 	}// $scope.Borrar






});//app.controller('controlGrilla',

app.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader)//, $routeParams, $location)
{
  $scope.persona={};
  $scope.DatoTest="**Modificar**";
  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
  $scope.uploader.queueLimit = 1;
  $scope.persona.id=$stateParams.id;
  $scope.persona.nombre=$stateParams.nombre;
  $scope.persona.apellido=$stateParams.apellido;
  $scope.persona.dni=$stateParams.dni;
  $scope.persona.foto=$stateParams.foto;

  $scope.cargarfoto=function(nombrefoto){

      var direccion="fotos/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem($scope.uploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              $scope.uploader.queue.push(dummy);
         });
  }
  $scope.cargarfoto($scope.persona.foto);


  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    $http.post('PHP/nexo.php', { datos: {accion :"modificar",persona:$scope.persona}})
        .then(function(respuesta) 
        {
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);
          $state.go("grilla");
        },
        function errorCallback(response)
        {
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };


  $scope.Guardar=function(persona)
  {
    if($scope.uploader.queue[0].file.name!='pordefecto.png')
    {
      var nombreFoto = $scope.uploader.queue[0]._file.name;
      $scope.persona.foto=nombreFoto;
    }
    $scope.uploader.uploadAll();
  }
});//app.controller('controlModificacion')

app.service('cargadoDeFoto',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,objetoUploader){
        var direccion="fotos/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });
    }
});//app.service('cargadoDeFoto',function($http,FileUploader){
 app.factory("factoryPersona",function(servicioUsuario){
  var persona = {nombre:"German",
   // servicioUsuario.retornarPersona(),
    mostrarNombre:function(dato)
    {  this.nombre= dato;
      servicioUsuario.retornarPersona().then(function(respuesta){
        console.log(respuesta);
      })
      //console.log("este es mi nombre "+dato)
      }//fin de mostrarNombre
   , TraerListado:  function(){ 
     return servicioUsuario.retornarPersona().then(function(respuesta){
        console.log(respuesta);
        return respuesta ;
      })
      //console.log("este es mi nombre "+dato)
      }//fin de TraerListado
  };
  return persona;
 }); 
 app.service('servicioUsuario',function($http){ 
  //var lista= {
  this.retornarPersona=function(){
      //var listado = "GermanMolina";
     // return listado;
    return  $http.get('/Angular_PHP_ABM_Persona-ngrepeat/Datos/Persona')// el nombre completro de la pagina
    .then(function(respuesta) {       
         return  respuesta.data;
         //console.log(respuesta.data);
    },function errorCallback(response) {
        return [];
       // console.log( response);     
   });
   };//fin retornarPersona

 // };//fin lista
//return lista;
});//app.service