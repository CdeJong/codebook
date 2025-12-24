<?php
$activeHome = (usesUri("/") || usesUri("/home")) ? "active" : ""; 
$activeCreate = usesUri("/create") ? "active" : ""; 
?>
<header>
    <div class="container">
        <nav>
            <a href=<?= createPath("home", $routes) ?> class=<?= $activeHome ?>>Home</a>
            <a href=<?= createPath("product.create", $routes) ?> class=<?= $activeCreate ?>>Create</a>
        </nav>
    </div>
</header>