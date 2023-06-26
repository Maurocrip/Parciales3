<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response as ResponseMW;

require_once __DIR__ . "./MD.php";
require_once __DIR__ . "./accesoDatos.php";

class Auto{

    public int $precio;
    public string $marca;
    public string $color;
    public string $modelo;
    //-------------------------------------ALTA----------------------------------------------------------------------------------------------------
    public static function AltaAutos(Request $request, Response $response, array $args) : Response {

        $arrayDeParametros = $request->getParsedBody();

        $Auto = json_decode($arrayDeParametros["json"]);
               
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

        $consulta =$objetoAccesoDato->retornarConsulta("INSERT INTO autos  (color, marca, precio, modelo)"
                                                    . "VALUES(:color, :marca, :precio, :modelo)");
        
        $consulta->bindValue(':color', $Auto->color, PDO::PARAM_STR);
        $consulta->bindValue(':marca', $Auto->marca, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $Auto->precio, PDO::PARAM_INT);
        $consulta->bindValue(':modelo', $Auto->modelo, PDO::PARAM_STR);

        $obj =new stdClass();

        if($consulta->execute())
        {
            $newResponse = $response->withStatus(200);

            $obj->mensaje = "Alta de auto completada";
            $obj->exito = true;
        }
        else
        {
            $newResponse = $response->withStatus(418);

            $obj->mensaje = "Eror en la alta del auto";
            $obj->exito = false;
        }   

        $newResponse->getBody()->write(json_encode($obj));
        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    //---------------------------------------MOSTRAR--------------------------------------------------------------------------------------------
    public static function MostraerAutos(Request $request, Response $response, array $args): Response 
	{
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->retornarConsulta("SELECT color, marca, precio, modelo FROM autos");        
    
        $obj =new stdClass();

        if($consulta->execute())
        { 
            $newResponse = $response->withStatus(200);

            $obj->mensaje = "lista de autos traida";
            $obj->exito = true;
            $obj->tabla = $consulta->fetchAll(PDO::FETCH_CLASS, "Auto");
        }
        else
        {
            $newResponse = $response->withStatus();

            $obj->mensaje = "Eror en traer la lista de autos";
            $obj->exito = false;
        }   
		$newResponse->getBody()->write(json_encode($obj));

		return $newResponse->withHeader('Content-Type', 'application/json');	
	}
    
    public static function eliminarAutos(Request $request, Response $response, array $args): Response
    {
        $id_auto = $request->getHeader("id")[0];

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->retornarConsulta("DELETE FROM autos WHERE id = :id");
        
        $consulta->bindValue(':id', $id_auto, PDO::PARAM_INT);

        $obj =new stdClass();

        if($consulta->execute())
        { 
            $newResponse = $response->withStatus(200);

            $obj->mensaje = "El auto a sido eliminado";
            $obj->exito = true;
        }
        else
        {
            $newResponse = $response->withStatus(418);

            $obj->mensaje = "Eror No se pudo eliminar el auto";
            $obj->exito = false;
        }   
		$newResponse->getBody()->write(json_encode($obj));

		return $newResponse->withHeader('Content-Type', 'application/json');	
    }

    public static function modificarAutos(Request $request, Response $response, array $args): Response
    {
        $id_auto = $request->getHeader("json")[0];

        $Auto = json_decode($id_auto);

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->retornarConsulta("UPDATE autos SET color = :color, marca =:marca,precio = :precio, modelo = :modelo WHERE id = :id");
        
        $consulta->bindValue(':id', $Auto->id, PDO::PARAM_INT);
        $consulta->bindValue(':color', $Auto->color, PDO::PARAM_STR);
        $consulta->bindValue(':marca', $Auto->marca, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $Auto->precio, PDO::PARAM_INT);
        $consulta->bindValue(':modelo', $Auto->modelo, PDO::PARAM_STR);

        $obj =new stdClass();

        if($consulta->execute())
        { 
            $newResponse = $response->withStatus(200);

            $obj->mensaje = "El auto a sido modificado";
            $obj->exito = true;
        }
        else
        {
            $newResponse = $response->withStatus(418);

            $obj->mensaje = "Eror No se pudo modificar el auto";
            $obj->exito = false;
        }   
		$newResponse->getBody()->write(json_encode($obj));

		return $newResponse->withHeader('Content-Type', 'application/json');	
    }

}