<?php
require_once("./clases/Usuario.php");
$objetoretorno = new stdClass();
$objetoretorno->exito =TRUE;
$objetoretorno->mensaje="";

$json = isset($_POST["usuario_json"]) ? (string) $_POST["usuario_json"] : "";
if($json != "")
{
    $objeto = json_decode($json);
    
    if(Usuario :: TraerUno($objeto->correo,$objeto->clave))
    {
        $objetoretorno->mensaje="El usuario ah sido encontrado";
    }
    else
    {
        $objetoretorno->exito =false;
        $objetoretorno->mensaje="El usuario no ah sido encontrado";
    }
}
else
{
    $objetoretorno->exito =false;
    $objetoretorno->mensaje="No recibio parametros";
}

var_dump($objetoretorno);