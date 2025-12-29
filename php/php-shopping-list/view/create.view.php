<?php
require "view/partial/header.php";
?>    
<h1 class="title">Create New Product</h1>
<form action="/create" method="POST">
    <label for="name">Name:</label>
    <input type="text" placeholder="Bread" required name="name">
    <?php if ($hasInvalidName): ?>
    <p class="error">Invalid name! Name uses disallowed characters or is too long.</p>
    <?php endif; ?>
    <label for="name">Price:</label>
    <input type="text" placeholder="1.99" required name="price">
    <?php if ($hasInvalidPrice): ?>
    <p class="error">Invalid price! The price should be a positive (decimal) number.</p>
    <?php endif; ?>
    <label for="name">Quantity:</label>
    <input type="number" min="0" placeholder="0" name="quantity">
    <?php if ($hasInvalidQuantity): ?>
    <p class="error">Invalid quantity! The quantity should be a positive (non-decimal) number.</p>
    <?php endif; ?>    
    <button type="submit" name="submit">Create</button>
    <?php if ($hasEmptyFields): ?>
    <p class="error">One or more input fields were empty, be sure to fill out all required input fields!</p>
    <?php endif; ?>
</form>    
<?php
require "view/partial/footer.php";
