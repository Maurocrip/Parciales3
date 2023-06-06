<?php
require_once("./clases/empleado.php");
$objetoretorno = new stdClass();
$objetoretorno->exito =false;
$objetoretorno->mensaje="";

$id = isset($_POST["id"]) ? (int) $_POST["id"] : 0;
if($id != 0)
{
    $empleadoAnterior = Empleado :: TraerUnoId($id);
    if(Empleado::Eliminar($id))
    {
        unlink($empleadoAnterior[0]->foto);
        $objetoretorno->exito =true;
        $objetoretorno->mensaje="El empleado ah sido eliminado";
    }
    else
    {
        $objetoretorno->mensaje="El empleado no ah sido eliminado";
    }
}
else
{
    $objetoretorno->mensaje="No recibio parametros";
}

var_dump($objetoretorno);