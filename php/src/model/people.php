<?php
require_once __DIR__ . "/../database/index.php";

class PeopleRepository
{

    private $db;

    public function __construct()
    {
        $this->db = DB::getConnection();
    }

    public function create($id, $nome, $nascimento, $apelido, $stack)
    {
        $stmt = $this->db->prepare("INSERT INTO pessoas (id, nome, nascimento, apelido, stack) VALUES (:id, :nome, :nasc, :apelido, :stack)");
        $stmt->bindValue(":id", $id, PDO::PARAM_STR);
        $stmt->bindValue(":nome", $nome, PDO::PARAM_STR);
        $stmt->bindValue(":nasc", $nascimento, PDO::PARAM_STR);
        $stmt->bindValue(":apelido", $apelido, PDO::PARAM_STR);
        $stmt->bindValue(":stack", $stack);

        try {
            return $stmt->execute();
        } catch (PDOException $e) {
            return false;
        }

    }

    public function findOne($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM pessoas WHERE id = :id");
        $stmt->bindValue(":id", $id, PDO::PARAM_STR);

        try {
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public function searchTerm($term)
    {
        $stmt = $this->db->prepare("SELECT * FROM pessoas WHERE searchable ILIKE :t LIMIT 50");
        $stmt->bindValue(":t", "%" . $term . "%", PDO::PARAM_STR);

        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $e) {
            return $e;
        }
    }

    public function count()
    {
        $stmt = $this->db->query("SELECT COUNT(*) FROM pessoas");
        $result = $stmt->fetch();
        return $result["count"];
    }
}
