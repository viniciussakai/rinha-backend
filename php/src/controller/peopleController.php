<?php
use Ramsey\Uuid\Uuid;

require __DIR__ . "/../model/people.php";

class PeopleController
{

    public static function create()
    {

        $body = Flight::request()->getBody();
        $body = json_decode($body, true);

        $nome = $body["nome"];
        $apelido = $body["apelido"];
        $nascimento = $body["nascimento"];
        $stack = $body["stack"];

        if (empty($stack) || empty($nascimento) || empty($nome) || empty($apelido)) {
            Flight::response()->status(422);
            return;
        }

        $data = DateTime::createFromFormat("Y-m-d", $nascimento);

        if ($data) {
            Flight::response()->status(400);
            return;
        }

        $id = Uuid::uuid4()->toString();

        $pessoaRepository = new PeopleRepository();
        $pessoa = $pessoaRepository->create($id, $nome, $nascimento, $apelido, json_encode($stack));

        if (!$pessoa) {
            Flight::response()->status(422);
            return;
        }

        Flight::response()->status(201)->header("Location", "/pessoas/" . $id);
    }

    public static function search()
    {
        $body = Flight::request()->query;

        $term = $body["t"];

        if (empty($term)) {
            Flight::response()->status(400);
            return;
        }

        $pessoaRepository = new PeopleRepository();
        $items = $pessoaRepository->searchTerm($term);

        Flight::json([$items]);
    }

    public static function findOne($id)
    {
        $pessoaRepository = new PeopleRepository();
        $pessoa = $pessoaRepository->findOne($id);

        if (!$pessoa) {
            Flight::response()->status(404);
            return;
        }

        Flight::json($pessoa);
    }

    public static function count()
    {
        $pessoaRepository = new PeopleRepository();
        $count = $pessoaRepository->count();
        Flight::json(array('count' => $count));
    }

}
