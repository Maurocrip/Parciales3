<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response as ResponseMW;

require_once __DIR__ . "./Usuarios.php";
require_once __DIR__ . "./autentificadora.php";

class MD{

    public function verificarCorreoClave(Request $request, RequestHandler $handler) : ResponseMW {
    
        $arrayParametros = $request->getParsedBody();
        $Usuario = json_decode($arrayParametros["json"]);
        
        $obj_datos = new stdClass();
        $obj_datos->exito = FALSE;
        $obj_datos->mensaje = "";

        if(isset($Usuario->clave) && isset($Usuario->correo))
        {
            $response = $handler->handle($request);
            $obj_datos =json_decode($response->getBody());
            $status = 200;
        }
        else{
    
            $obj_datos->mensaje = "clave o correo no pasados";
            $status = 403;
        } 
    
        $response = new ResponseMW($status);
    
        $response->getBody()->write(json_encode($obj_datos));
    
        return $response->withHeader('Content-Type', 'application/json');
    }

    public static function verificarvacio(Request $request, RequestHandler $handler) : ResponseMW {
    
        $arrayParametros = $request->getParsedBody();
        $Usuario = json_decode($arrayParametros["json"]);
        
        $obj_datos = new stdClass();
        $obj_datos->exito = FALSE;
        $obj_datos->mensaje = "";

        if($Usuario->correo != ""  && $Usuario->clave != "")
        {
            $response = $handler->handle($request);
            $obj_datos =json_decode($response->getBody());
            
            $status = 200;
        }
        else{
    
            $obj_datos->mensaje = "correo o clave vacio";
            $status = 409;
        } 
    
        $response = new ResponseMW($status);
    
        $response->getBody()->write(json_encode($obj_datos));
    
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function verificarExistencia(Request $request, RequestHandler $handler) : ResponseMW {
    
        $arrayParametros = $request->getParsedBody();
        $Usuario = json_decode($arrayParametros["json"]);
        
        $obj_datos = Usuario::VarificarUsuario($Usuario->clave,$Usuario->correo);

        if($obj_datos->exito)
        {
            $response = $handler->handle($request);
            $obj_datos =json_decode($response->getBody());
            $status = 200;
        }
        else{
            $status = 403;
        } 
    
        $response = new ResponseMW($status);
    
        $response->getBody()->write(json_encode($obj_datos));
    
        return $response->withHeader('Content-Type', 'application/json');
    }

    public static function verificarExistenciaCorreo(Request $request, RequestHandler $handler) : ResponseMW {
    
        $arrayParametros = $request->getParsedBody();
        $Usuario = json_decode($arrayParametros["json"]);
        
        $obj_datos = Usuario::UsoDelCorreo($Usuario->correo);

        if($obj_datos->exito)
        {
            $response = $handler->handle($request);
            $objeto =json_decode($response->getBody());
            $obj_datos->mensaje = $objeto->mensaje;
            $obj_datos->exito = $objeto->exito;
            $status = 200;
        }
        else{
            $status = 403;
        } 
    
        $response = new ResponseMW($status);
    
        $response->getBody()->write(json_encode($obj_datos));
    
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function verificarAuto(Request $request, RequestHandler $handler) : ResponseMW {
    
        $arrayParametros = $request->getParsedBody();
        $auto = json_decode($arrayParametros["json"]);
        
        $obj_datos = new stdClass();
        $obj_datos->mensaje = "el color es azul o el precio no esta entre 50.000 y 600.000 pesos";
        $obj_datos->exito = false;

        if(($auto->precio >=50000 &&  $auto->precio <=600000)  && $auto->color != "azul")
        {
            $response = $handler->handle($request);
            $objeto =json_decode($response->getBody());
            $obj_datos->mensaje = $objeto->mensaje;
            $obj_datos->exito = $objeto->exito;
            $status = 200;
        }
        else{
            $status = 409;
        } 
    
        $response = new ResponseMW($status);
    
        $response->getBody()->write(json_encode($obj_datos));
    
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function verificarPropietario(Request $request, RequestHandler $handler) : ResponseMW {
    
        $token = $request->getHeader("token")[0];
        
        $obj = Autentificadora ::obtenerPayLoad($token); 
        $usuario = $obj->payload->usuario;

        $obj_datos = new stdClass();
        $obj_datos->mensaje = "No sos propietario";
        $obj_datos->exito = false;
        if($usuario[0]->perfil =="Propietario" || $usuario[0]->perfil =="propietario")
        {
            $response = $handler->handle($request);
            $objeto =json_decode($response->getBody());
            $obj_datos->mensaje = $objeto->mensaje;
            $obj_datos->exito = $objeto->exito;
            $status = 200;
        }
        else{
            $status = 409;
        } 
    
        $response = new ResponseMW($status);
    
        $response->getBody()->write(json_encode($obj_datos));
    
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function verificarencargado(Request $request, RequestHandler $handler) : ResponseMW {
    
        $token = $request->getHeader("token")[0];
        
        $obj = Autentificadora ::obtenerPayLoad($token); 
        $usuario = $obj->payload->usuario;

        $obj_datos = new stdClass();
        $obj_datos->mensaje = "No sos encargado";
        $obj_datos->exito = false;
        if($usuario[0]->perfil =="encargado" || $usuario[0]->perfil =="Encargado")
        {
            $response = $handler->handle($request);
            $objeto =json_decode($response->getBody());
            $obj_datos->mensaje = $objeto->mensaje;
            $obj_datos->exito = $objeto->exito;
            $status = 200;
        }
        else{
            $status = 409;
        } 
    
        $response = new ResponseMW($status);
    
        $response->getBody()->write(json_encode($obj_datos));
    
        return $response->withHeader('Content-Type', 'application/json');
    }



}