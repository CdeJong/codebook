<?php

require "routes.php";

function routeToController($uri, $routes) {
    $controllerPath = "controller";

    foreach ($routes as $route) {
        if ($uri == $route["path"]) {
            require $controllerPath . DIRECTORY_SEPARATOR . $route["controller"];
            return; // so 404 code doesn't run
        }
    }
    abort($routes);
}

function redirect($name, $routes, $parameters = []) {
    $path = createPath($name, $routes, $parameters);
    header("Location: " . $path);
    die();
}

function createPath($name, $routes, $parameters = []) {
    foreach ($routes as $route) {
        $routeName = $route["name"] ?? null;
        
        if ($routeName === null) {
            continue;
        }

        if ($name !== $route["name"]) {
            continue;
        }

        $path = $route["path"];
        $query = "";
        
        if (count($parameters) > 0) {
            $query = "?" . http_build_query($parameters);
        }

        return $path . $query;

    }
    throw new InvalidArgumentException("Unknown named route: " . $name);
}

function abort($routes) {
    require "view/page-not-found.php";
    die();
}