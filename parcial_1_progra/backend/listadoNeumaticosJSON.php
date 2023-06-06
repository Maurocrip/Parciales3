<?php
require_once("./clases/neumatico.php");
use mauroRacioppi\Neumatico;

echo json_encode(Neumatico::traerJSON("./archivos/neumaticos.json"));

