<?php
class Database {

    private $pdo;

    public function __construct($credentials) {
        $host = $credentials["host"];
        $port = $credentials["port"];
        $username = $credentials["username"];
        $password = $credentials["password"];
        $database = $credentials["database"];

        $sourceName = "mysql:host=" . $host . ";port=" . $port . ";dbname=" . $database . ";charset=utf8mb4";
        $this->pdo = new PDO($sourceName, $username, $password);
    }

    public function query($query, $params=[]) {
        $statement = $this->pdo->prepare($query);
        $statement->execute($params);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($query, $params=[]) {
        $statement = $this->pdo->prepare($query);
        $statement->execute($params);
        return $statement->rowCount();
    }

}