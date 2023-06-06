<?php
require_once("./clases/empleado.php");
$objetoretorno = new stdClass();
$objetoretorno->exito =false;
$objetoretorno->mensaje="";

$json = isset($_POST["empleado_json"]) ? (string) $_POST["empleado_json"] : "";
if($json != "")
{
    $objeto = json_decode($json);
    $_FILES["foto"]["name"] = "./empleados/fotos/".$objeto->nombre . date("his") .".png";
    $empleado = new Empleado($objeto->correo,$objeto->nombre,$objeto->clave,$objeto->id,$objeto->id_perfil,$_FILES["foto"]["name"],$objeto->sueldo);
    $empleadoAnterior = Empleado :: TraerUnoId($objeto->id);
    unlink($empleadoAnterior[0]->foto);
    if($empleado->Modificar($objeto->id))
    {
        if(move_uploaded_file($_FILES["foto"]["tmp_name"],$_FILES["foto"]["name"]))
        {
            $objetoretorno->mensaje= "se modifico el empleado y la foto";
            $objetoretorno->exito =true;
        }
        else
        {
            $objetoretorno->mensaje= "se modifico el empleado pero no la foto";
        }
    }
    else
    {
        $objetoretorno->mensaje="El empleado no ah sido modificado";
    }
}
else
{
    $objetoretorno->mensaje="No recibio parametros";
}

var_dump($objetoretorno);