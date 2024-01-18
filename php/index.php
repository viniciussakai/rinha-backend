<?php
require 'vendor/autoload.php';
require_once "src/routes.php";

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

Flight::start();
