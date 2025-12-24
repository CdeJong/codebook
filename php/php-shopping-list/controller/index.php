<?php
require "Database.php";
require "config.php";
$database = new Database($databaseCredentials);

$products = $database->query("SELECT * FROM products;");

$total = array_reduce($products, function ($total, $product) {
    return $total + $product["price"] * $product["quantity"];
});

require "view/index.view.php";

