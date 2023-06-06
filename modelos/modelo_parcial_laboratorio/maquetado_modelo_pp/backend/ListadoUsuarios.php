<?php
require_once("./clases/Usuario.php");

$obj=Usuario :: TraerTodos();

$tabla=" <TABLE BORDER><TR> <TH>Id</TH> <TH>Nombre</TH> <TH>Correo</TH> <TH>Clave</TH> <TH>Id perfil</TH> <TH>Acciones</TH></TR>";

for ($index = 0; $index < count($obj); $index++) {
    $tabla .= '<TR><TD>'.$obj[$index]->id.'</TD> <TD>'.$obj[$index]->nombre.'</TD> <TD>'.$obj[$index]->correo.'</TD> <TD>'.$obj[$index]->clave.'</TD> <TD>'.$obj[$index]->id_perfil.
    '<td><input type="button" value="Llenar datos" name="btn-llenarDatos" data-obj=' . json_encode($obj[$index]) .
    '><input type="button" value="Eliminar" name="btn-eliminar" data-obj=' . json_encode($obj[$index]) . ' ></td> '. '</TD> </TR>';                 
}

$tabla .= `</TABLE>`;
echo $tabla;
