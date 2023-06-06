<?php
require_once("./clases/empleado.php");
$nombre = isset($_POST["nombre"]) ? (string) $_POST["nombre"] : "";
$correo = isset($_POST["correo"]) ? (string) $_POST["correo"] : "";
$clave = isset($_POST["clave"]) ? (string) $_POST["clave"] : "";
$id_perfil = isset($_POST["id_perfil"]) ? (int) $_POST["id_perfil"] : 0;
$sueldo = isset($_POST["sueldo"]) ? (int) $_POST["sueldo"] : 0;
$_FILES["foto"]["name"] = "./empleados/fotos/".$nombre . date("his") .".png";

$objetoretorno = new stdClass();
$objetoretorno->exito =false;
$objetoretorno->mensaje="";

if($nombre != "" && $correo != "" && $clave != "" && $id_perfil != 0 && $id_perfil != 0)
{
    $empleado = new Empleado($correo,$nombre,$clave,-1,$id_perfil,$_FILES["foto"]["name"],$sueldo);
    if($empleado->Agregar())
    {
        if(move_uploaded_file($_FILES["foto"]["tmp_name"],$_FILES["foto"]["name"]))
        {
            $objetoretorno->mensaje= "se subio el empleado y la foto";
            $objetoretorno->exito =true;
        }
        else
        {
            $objetoretorno->mensaje= "se subio el empleado pero no la foto";
        }
    }
    else
    {
        $objetoretorno->mensaje="No se pudo agregar el empleado";
    }
}
else
{
    $objetoretorno->mensaje="No se recibio parametros";
}

var_dump($objetoretorno);
