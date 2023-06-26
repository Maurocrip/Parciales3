<?php
require_once("./clases/empleado.php");

$array = Empleado :: TraerTodos();

$tabla ="!html <TABLE BORDER><TR><TH>Id</TH> <TH>Correo</TH> <TH>Clave</TH> <TH>Nombre</TH> <TH>Id perfil</TH> <TH>Sueldo</TH> <TH>foto</TH></TR>";
/*$tabla = "mostrar datos<table>
<thead>
    <tr>
        <td>id</td>
        <td>correo</td>
        <td>nombre</td>
        <td>id_perfil</td>
        <td>sueldo</td>
        <td>pathFoto</td>
        <td>foto</td>
    </tr>
</thead>
<tbody>";*/
//var_dump($array);
foreach($array as $elemento)
{
    //var_dump($elemento);
    //$tabla .= `<tr><td>$elemento->id</td> <td>$elemento->correo</td> <td>$elemento->clave</td> <td>$elemento->nombre</td> <td>$elemento->id_perfil</td> <td>$elemento->sueldo</td><td><img src="$elemento->foto"</td>  </tr>`;
    $tabla .='<tr><td>' . $elemento->id .'</td><td>' . $elemento->correo . '</td><td>' . $elemento->nombre .'</td><td>' . $elemento->id_perfil . '</td><td>' . $elemento->sueldo .'</td><td>' .$elemento->foto. '</td><td>' . "<img src=" . $elemento->foto  . " width=\"50\" height=\"50\" />". '</td></tr>';
}

$tabla .= `  </tbody>
</table>`;

echo $tabla;
?>