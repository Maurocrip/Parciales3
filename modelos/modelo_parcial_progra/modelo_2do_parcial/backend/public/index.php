<?php
use Slim\Factory\AppFactory;

require __DIR__ . '../../vendor/autoload.php';
require __DIR__ . '../../clases/Usuarios.php';
require __DIR__ . '../../clases/Autos.php';

$app = AppFactory::create();

$app->post('/usuarios', \Usuario::class . ':AltaUsuario')->add(\MD::class . ':verificarExistenciaCorreo')->add(\MD::class . ':verificarvacio')->add(\MD::class . ':verificarCorreoClave');
$app->get('/', \Usuario::class . ':MostraerUsuario');
$app->post('/', \Auto::class . ':AltaAutos')->add(\MD::class . ':verificarAuto');
$app->get('/autos', \Auto::class . ':MostraerAutos');
$app->get('/login', \Usuario::class . ':verificar');
$app->post('/login', \Usuario::class . ':crearJWT')->add(\MD::class . ':verificarExistencia')->add(\MD::class . ':verificarvacio')->add(\MD::class . ':verificarCorreoClave');
$app->delete('/', \Auto::class . ':eliminarAutos')->add(\MD::class . ':verificarPropietario');
$app->put('/', \Auto::class . ':modificarAutos')->add(\MD::class . ':verificarencargado');

//CORRE LA APLICACIÓN.
$app->run();