<?php
set_include_path($_SERVER['DOCUMENT_ROOT']);

$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

require "util/escape-util.php";
require "util/ValidatorUtil.php";
require "util/uri-util.php";
require "router.php";

routeToController($uri, $routes);