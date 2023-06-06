<?php
interface ICRUD
{
    static function TraerTodos() : array;
    function Agregar() : bool;
    function Modificar(int $id) : bool;
    static function Eliminar(int $id) : bool;
}