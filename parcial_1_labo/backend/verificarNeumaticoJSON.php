<?php
require_once("./clases/neumatico.php");
use mauroRacioppi\Neumatico;

$marca = isset($_POST["marca"]) ? (string) $_POST["marca"] : "";
$medidas = isset($_POST["medidas"]) ? (string) $_POST["medidas"] : "";

$neumatico = new Neumatico($marca,0,$medidas);

var_dump(Neumatico::verificarNeumaticoJSON($neumatico,"./archivos/neumaticos.json"));

