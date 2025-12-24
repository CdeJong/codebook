<?php
require "view/partial/header.php";
?>
<h1 class="title">404 - Page Not Found</h1>
<p>The page you're trying to reach may have been moved, removed, or never existed. 
    Please check the URL or return to the <a href=<?= createPath("home", $routes); ?>>homepage</a>.</p>
<?php
require "view/partial/footer.php";