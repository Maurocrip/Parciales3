<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once __DIR__ . "./MD.php";
require_once __DIR__ . "./accesoDatos.php";
require_once __DIR__ . "./autentificadora.php";

class Usuario
{
    public int $clave;
    public int $id;
    public string $correo;
    public string $nombre;
    public string $apellido;
    public string $foto;
    public string $perfil;
    //-------------------------------------ALTA----------------------------------------------------------------------------------------------------
    public static function AltaUsuario(Request $request, Response $response, array $args) : Response {

        $arrayDeParametros = $request->getParsedBody();
        $archivos = $request->getUploadedFiles();

        $Usuario = json_decode($arrayDeParametros["json"]);
        $nombreAnterior = $archivos['foto']->getClientFilename();

        $extension = explode(".", $nombreAnterior);
        $extension = array_reverse($extension);
        $path = "../fotos/" . $Usuario->correo . "_" . $Usuario->clave . "." . $extension[0];
        
		$archivos['foto']->moveTo($path);
        
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

        $consulta =$objetoAccesoDato->retornarConsulta("INSERT INTO usuarios (correo, clave, nombre, apellido, perfil, foto)"
                                                    . "VALUES(:correo, :clave, :nombre, :apellido, :perfil, :foto)");
        
        $consulta->bindValue(':correo', $Usuario->correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $Usuario->clave, PDO::PARAM_INT);
        $consulta->bindValue(':nombre', $Usuario->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $Usuario->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':perfil', $Usuario->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $path, PDO::PARAM_STR);

        $obj =new stdClass();

        if($consulta->execute())
        {
            $newResponse = $response->withStatus(200);

            $obj->mensaje = "Alta de usuario completada";
            $obj->exito = true;
        }
        else
        {
            $newResponse = $response->withStatus(418);

            $obj->mensaje = "Eror en la alta del usuario";
            $obj->exito = false;
        }   

        $newResponse->getBody()->write(json_encode($obj));
        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    //---------------------------------------MOSTRAR--------------------------------------------------------------------------------------------
    public static function MostraerUsuario(Request $request, Response $response, array $args): Response 
	{
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->retornarConsulta("SELECT id, correo, clave, nombre, apellido, perfil FROM usuarios");        
    
        $obj =new stdClass();

        if($consulta->execute())
        { 
            $newResponse = $response->withStatus(200);

            $obj->mensaje = "lista de usuario traida";
            $obj->exito = true;
            $obj->tabla = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
        }
        else
        {
            $newResponse = $response->withStatus(424);

            $obj->mensaje = "Eror en traer la lista de usuarios";
            $obj->exito = false;
        }   
		$newResponse->getBody()->write(json_encode($obj));

		return $newResponse->withHeader('Content-Type', 'application/json');	
	}
    //---------------------------------------CREAR JWT--------------------------------------------------------------------------------------------

    public static function crearJWT(Request $request, Response $response, array $args) : Response 
    {
        $arrayDeParametros = $request->getParsedBody();
        $Usuario = json_decode($arrayDeParametros["json"]);
        $datos = self::TraerUnUsuario($Usuario->clave, $Usuario->correo);
        
        $obj =new stdClass();
        $obj->mensaje = "token creado";
        $obj->exito = true;
        $obj->tabla= "";
        
        if($datos->exito)
        {
            $obj->tabla = Autentificadora::crearJWT($datos->usuario, 30);
        }
        else
        {
            $obj->mensaje = "token no creado";
            $obj->exito = false;
        }
        $newResponse = $response->withStatus(200, "Éxito!!! JSON enviado.");
  
        $newResponse->getBody()->write(json_encode($obj));
    
        return $newResponse->withHeader('Content-Type', 'application/json');
    }
    //---------------------------------------VERIFICAR JWT--------------------------------------------------------------------------------------------

    public static function verificar(Request $request, Response $response, array $args) : Response {

        $token = $request->getHeader("token")[0];

        $obj_rta = Autentificadora::verificarJWT($token);

        $status = $obj_rta->verificado ? 200 : 403;

        $newResponse = $response->withStatus($status);

        $newResponse->getBody()->write(json_encode($obj_rta));
    
        return $newResponse->withHeader('Content-Type', 'application/json');
    }

//---------------------------------------PARA MD--------------------------------------------------------------------------------------------
    public static function TraerUnUsuario($clave, $correo): stdClass 
	{
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->retornarConsulta("SELECT id, correo, clave, nombre, apellido, perfil FROM usuarios WHERE clave = :clave and correo = :correo");        
        
        $consulta->bindValue(':correo', $correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $clave, PDO::PARAM_INT);
        
        $obj =new stdClass();

        if($consulta->execute())
        { 
            $obj->usuario = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
            $obj->mensaje = "Usuario traido";
            $obj->exito = true;
        }
        else
        {
            $obj->mensaje = "ERROR, Usuario no traido";
            $obj->exito = false;
        }   

		return $obj;	
	}

    public static function VarificarUsuario($clave, $correo): stdClass 
	{
        $obj = self:: TraerUnUsuario($clave, $correo);

        if($obj->exito)
        {           
            if(count($obj->usuario)>0)
            {
                $obj->mensaje = "Existe el usuario";
            }
            else
            {
                $obj->mensaje = "Usuario no existe";
                $obj->exito = false;
            }
        }

		return $obj;	
	}

    public static function UsoDelCorreo($correo): stdClass 
	{
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->retornarConsulta("SELECT * FROM usuarios WHERE correo = :correo");        
        
        $consulta->bindValue(':correo', $correo, PDO::PARAM_STR);
        
        $obj =new stdClass();
        $obj->mensaje = "Ya esta en uso el correo";
        $obj->exito = false;

        if($consulta->execute())
        { 
            
            if(count($consulta->fetchAll(PDO::FETCH_CLASS, "Usuario")) <=0)
            {
                $obj->mensaje = "Se puede usar el correo";
                $obj->exito = true;
            };
        }
        else
        {
            $obj->mensaje = "ERROR, Usuario no traido";
        }   

		return $obj;	
	}
}