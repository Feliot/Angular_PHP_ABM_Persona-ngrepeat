
var app = angular.module('ABMangularPHP', ['ui.router','angularFileUpload']);
// se pueden agregar sus distintas variables. entre comillas simpleas

app.config(function($stateProvider, $urlRouterProvider){
$stateProvider
.state('menu',{templateUrl:'templatemenu.html', url:'/menu', controller:'controlMenu'})
.state('alta',{templateUrl:'templateusuario.html', url:'/alta', controller:'controlAlta'})
.state('grilla',{templateUrl:'templategrilla.html', url:'/grilla', controller:'controlGrilla'})
.state('modificar',{templateUrl:'templateusuario.html', url:'/modificar/{:id}?nombre:apellido:dni:foto', controller:'controlModificar'})
$urlRouterProvider.otherwise('/menu'); // $urlRouterProvider.otherwise sirve para colocar un estado por efecto.
});//fin de app.config
app.controller('controlMenu', function($scope, $http) {
  $scope.DatoTest="**Menu**";
});


app.controller('controlAlta', function($scope, $http, FileUploader ) {
  $scope.DatoTest="**alta**";
  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
      $scope.uploader.queueLimit = 1; // indico cuantos archivos permito cargar
//inicio las variables
  $scope.persona={};
  $scope.persona.nombre= "natalia" ;
  $scope.persona.dni= "12312312" ;
  $scope.persona.apellido= "natalia" ;
  $scope.persona.foto="pordefecto.png";


  $scope.Guardar=function(){
    $scope.uploader.uploadAll();
  	console.log("persona a guardar:");
    console.log($scope.persona);
    $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
 	  .then(function(respuesta) {     	
 		     //aca se ejetuca si retorno sin errores  
        $http.get('PHP/nexo.php', { params: {accion :"traer"}})
        .then(function(respuesta) {       

         $scope.ListadoPersonas = respuesta.data.listado;
         console.log(respuesta.data);
          },function errorCallback(response) {     		
     		//aca se ejecuta cuando hay errores
     		console.log( response); 
        }  );  			
 	  });
  

  }
});


app.controller('controlGrilla', function($scope, $http) {
  	$scope.DatoTest="**grilla**";
 	
 	$http.get('PHP/nexo.php', { params: {accion :"traer"}})
 	.then(function(respuesta) {     	

      	 $scope.ListadoPersonas = respuesta.data.listado;
      	 console.log(respuesta.data);

    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log( response);
     			/*

					https://docs.angularjs.org/api/ng/service/$http

     			the response object has these properties:

				data – {string|Object} – The response body transformed with the transform functions.
				status – {number} – HTTP status code of the response.
				headers – {function([headerName])} – Header getter function.
				config – {Object} – The configuration object that was used to generate the request.
				statusText – {string} – HTTP status text of the response.
						A response status code between 200 and 299 is considered a success
						 status and will result in the success callback being called. 
						 Note that if the response is a redirect, XMLHttpRequest will 
						 transparently follow it, meaning that 
						 the error callback will not be called for such responses.
 	 */
 	 });

 	$scope.Borrar=function(persona){
		console.log("borrar"+persona);



$http.post("PHP/nexo.php",{datos:{accion:"borrar",persona:persona}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
 .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

/*
     $http.post('PHP/nexo.php', 
      headers: 'Content-Type': 'application/x-www-form-urlencoded',
      params: {accion :"borrar",persona:persona})
    .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

*/
 	}




 	$scope.Modificar=function(id){
 		
 		console.log("Modificar"+id);

 	}





});
app.controller('controlModificar', function($scope, $http, $stateparams) {
  $scope.DatoTest="**modificar**";

//inicio las variables
  $scope.persona={};
  $scope.persona.nombre= "asdasd" ;
  $scope.persona.dni= $stateparams.id;
  $scope.persona.apellido= "pasd" ;
  $scope.persona.foto="sinfoto";




  
});