<?php
require "view/partial/header.php";
?> 
<h1 class="title">Product Overview</h1>
<table>
    <thead>
        <tr>
            <th>Product</th>
            <th>Prijs</th>
            <th>Aantal</th>
            <th>Subtotaal</th>
        </tr>
    </thead>
    <tbody>
<?php foreach ($products as $product): ?>
        <tr title="<?= "Created at " . $product["created_at"]; ?>" >
            <td><?= escape($product["name"]); ?></td>
            <td class="numeric"><?= number_format($product["price"], 2); ?></td>
            <td><?= $product["quantity"]; ?></td>
            <td class="numeric"><?= number_format($product["quantity"] * $product["price"], 2); ?></td>
        </tr>
<?php endforeach; ?>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3" class="bold">Totaal</td>
            <td class="numeric bold"><?= number_format($total, 2); ?></td>
        </tr>
    </tfoot>
</table>
<?php
require "view/partial/footer.php";
