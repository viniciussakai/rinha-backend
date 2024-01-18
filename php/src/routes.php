<?php
require_once 'controller/peopleController.php';

Flight::route('POST /pessoas', [PeopleController::class, 'create']);
Flight::route('GET /pessoas', [PeopleController::class, "search"]);
Flight::route('GET /pessoas/@id', function ($id) {
    PeopleController::findOne($id);
});
Flight::route('GET /contagem-pessoas', [PeopleController::class, "count"]);
