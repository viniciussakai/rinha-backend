<?php

class DB
{
    private static $conn;

    private function __construct()
    {}

    public static function getConnection()
    {
        if (self::$conn !== null) {
            return self::$conn;
        }

        $config = [
            "url" => $_ENV["DATABASE_URL"],
            "user" => $_ENV["DATABASE_USER"],
            "pass" => $_ENV["DATABASE_PASS"],
        ];

        self::$conn = new PDO($config['url'], $config['user'], $config['pass'], array(
            PDO::ATTR_PERSISTENT => true,
        ));

        return self::$conn;

    }
}
