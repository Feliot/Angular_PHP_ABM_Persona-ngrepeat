angular.module("ABMangularPHP").directive("utnDirectivaSaludar",function()
    {
        return {template:"<h1>Hola UTN Fra</h1>",
        		restrict:'AEC',
        		replace:true
    			};
    });
//obtuvimos un modulo. y definimos nuestra directiva.
angular.module("ABMangularPHP").directive("utnBotonMenu",function()
    {
        return {templateUrl:"template/templateBoton.html",
        		restrict:'AEC',
        		replace:true,
        		scope:{titulo:'@'}
    			};
    });
//obtuvimos un modulo. y definimos nuestra directiva.
//scope:true  pasar por valor 
 angular.module("ABMangularPHP").directive("datosDeLasPersonas",function()
    {
        return {templateUrl:"template/templateDatosDePersona.html",
                restrict:'AEC',
                replace:true,
                scope:false
                };
    }); 