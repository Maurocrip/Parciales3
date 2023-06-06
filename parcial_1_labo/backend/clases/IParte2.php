<?php
require_once("./clases/IParte1.php");
interface IParte2 extends IParte1
{
    static function eliminar($id) : bool;
    function modificar($id) : bool;
}