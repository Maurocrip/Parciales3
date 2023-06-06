<?php
require_once("./clases/IParte2.php");
interface IParte3 extends IParte2
{
    function existe($array) : bool;
}