<?php
require "Database.php";
require "config.php";
$database = new Database($databaseCredentials);

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $error = $_GET["error"] ?? null;
    $hasEmptyFields = $error === "empty-fields";
    $hasInvalidName = $error === "invalid-name";
    $hasInvalidQuantity = $error === "invalid-quantity";
    $hasInvalidPrice = $error === "invalid-price";

    require "view/create.view.php";
} else if ($_SERVER["REQUEST_METHOD"] === "POST") {
    handlePost($routes, $database);    
} else {
    http_response_code(405);
    die();
}

function handlePost($routes, $database) {
    $name = $_POST["name"] ?? null;
    $price = $_POST["price"] ?? null;
    $quantity = $_POST["quantity"] ?? null;
    
    if ($name === null || $price === null || $quantity == null) {
        redirect("product.create", $routes, ["error" => "empty-fields"]);
        return;
    }

    if (!ValidatorUtil::string($name, 1, 50)) { // 50 is current database limit
        redirect("product.create", $routes, ["error" => "invalid-name"]);
        return;
    }

    if (!ValidatorUtil::integer($quantity, 0, PHP_INT_MAX)) {
        redirect("product.create", $routes, ["error" => "invalid-quantity"]); 
        return;
    }

    if (!ValidatorUtil::decimal($price, 0, INF)) {
        redirect("product.create", $routes, ["error" => "invalid-price"]);
        return;
    }

    $database->update(
        "INSERT INTO products (name, price, quantity) VALUES (:name, :price, :quantity);", 
        [":name" => $name, ":price" => $price, ":quantity" => $quantity]
    );

    redirect("home", $routes);
}


