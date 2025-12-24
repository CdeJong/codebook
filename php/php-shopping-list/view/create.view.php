<?php
require "view/partial/header.php";
?>    
<h1 class="title">Create New Product</h1>
<form action="/create" method="POST">
    <label for="name">Name:</label>
    <input type="text" placeholder="Bread" required name="name">

    <label for="name">Price:</label>
    <input type="text" placeholder="1.99" required name="price">

    <label for="name">Amount:</label>
    <input type="number" min="0" placeholder="0" name="quantity">

    <button type="submit" name="submit">Create</button>
</form>    
<?php
require "view/partial/footer.php";
