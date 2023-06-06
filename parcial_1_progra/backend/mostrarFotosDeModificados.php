<?php

$directorio = "./neumaticosModificados/";

// Obtener la lista de archivos en la carpeta
$archivos = scandir($directorio);

$tabla ="TABLA<TABLE BORDER><TR><TH>PATH</TH> <TH>FOTO</TH></TR>";
// Iterar sobre los archivos y mostrarlos en la tabla
foreach ($archivos as $archivo) {
    // Excluir los directorios "." y ".."
    if ($archivo != "." && $archivo != "..") {
        $tabla .= '<tr>';
        $tabla .='<td style="border: 1px solid black; padding: 8px;">' . $archivo . '</td>';
        $tabla .= '<td style="border: 1px solid black; padding: 8px;"><img src="' . $directorio . $archivo . '" style="width: 120px; height: 120px;"></td>';
        $tabla .= '</tr>';
    }
}
echo $tabla;

