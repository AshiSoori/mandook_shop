<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once('config.php');

if (!$conn) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]);
    exit;
}

/* ---------------- COLORS PER PRODUCT ---------------- */

$colorsResult = mysqli_query($conn, "
    SELECT pc.product_id, c.id AS color_id, c.color
    FROM product_colors pc
    JOIN colors c ON pc.color_id = c.id
");

if (!$colorsResult) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Colors query failed"
    ]);
    exit;
}

$productColors = [];
while ($row = mysqli_fetch_assoc($colorsResult)) {
    $productColors[$row['product_id']][] = [
        "id" => (int)$row['color_id'],
        "name" => $row['color']
    ];
}

/* ---------------- SIZES PER PRODUCT ---------------- */

$sizesResult = mysqli_query($conn, "
    SELECT ps.product_id, s.id AS size_id, s.size
    FROM product_sizes ps
    JOIN sizes s ON ps.size_id = s.id
");

if (!$sizesResult) {   // ❗ FIXED (was checking wrong variable)
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Sizes query failed"
    ]);
    exit;
}

$productSizes = [];
while ($row = mysqli_fetch_assoc($sizesResult)) {
    $productSizes[$row['product_id']][] = [
        "id" => (int)$row['size_id'],
        "name" => $row['size']
    ];
}

/* ---------------- VARIANTS ---------------- */

/*$variantsResult = mysqli_query($conn, "
    SELECT product_id, color_id, size_id, stock
    FROM product_variants
");

if (!$variantsResult) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Variants query failed"
    ]);
    exit;
}

$productVariants = [];
while ($row = mysqli_fetch_assoc($variantsResult)) {
    $productVariants[$row['product_id']][] = [
        "color_id" => (int)$row['color_id'],
        "size_id"  => (int)$row['size_id'],
        "stock"    => (int)$row['stock']
    ];
}*/

/* ---------------- VARIANTS (WITH COLOR & SIZE NAMES) ---------------- */

$variantsResult = mysqli_query($conn, "
    SELECT
        pv.product_id,
        pv.color_id,
        c.color AS color,
        pv.size_id,
        s.size AS size,
        pv.stock
    FROM product_variants pv
    JOIN colors c ON pv.color_id = c.id
    JOIN sizes  s ON pv.size_id  = s.id
");

if (!$variantsResult) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Variants query failed"
    ]);
    exit;
}

$productVariants = [];
while ($row = mysqli_fetch_assoc($variantsResult)) {
    $productVariants[$row['product_id']][] = [
        "color_id" => (int)$row['color_id'],
        "color"    => $row['color'],
        "size_id"  => (int)$row['size_id'],
        "size"     => $row['size'],
        "stock"    => (int)$row['stock']
    ];
}


/* ---------------- ALL PRODUCTS ---------------- */

$productResult = mysqli_query($conn, "SELECT * FROM products");

if (!$productResult) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Products query failed"
    ]);
    exit;
}

$products = [];
while ($row = mysqli_fetch_assoc($productResult)) {
    $pid = $row['id'];
    // $row['colors']   = $productColors[$pid] ?? [];
    // $row['sizes']    = $productSizes[$pid] ?? [];
    $row['variants'] = $productVariants[$pid] ?? [];

    $products[] = $row;
}

/* ---------------- FILTERED PRODUCTS ---------------- */

function filterProductsByType($conn, $type, $productColors, $productSizes, $productVariants) {
    $result = mysqli_query($conn, "SELECT * FROM products WHERE type='$type'");
    $items = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $pid = $row['id'];
        // $row['colors']   = $productColors[$pid] ?? [];
        // $row['sizes']    = $productSizes[$pid] ?? [];
        $row['variants'] = $productVariants[$pid] ?? [];
        $items[] = $row;
    }

    return $items;
}

$tshirts  = filterProductsByType($conn, 'Tshirts',  $productColors, $productSizes, $productVariants);
$trousers = filterProductsByType($conn, 'Trousers', $productColors, $productSizes, $productVariants);

/* ---------------- AMAZING PRODUCTS ---------------- */

$amazingResult = mysqli_query($conn, "SELECT * FROM products WHERE onsupersale = 1");
$amazingProducts = [];

while ($row = mysqli_fetch_assoc($amazingResult)) {
    $pid = $row['id'];
    // $row['colors']   = $productColors[$pid] ?? [];
    // $row['sizes']    = $productSizes[$pid] ?? [];
    $row['variants'] = $productVariants[$pid] ?? [];
    $amazingProducts[] = $row;
}

/* ---------------- ALL COLORS & SIZES ---------------- */

$allColors = [];
$res = mysqli_query($conn, "SELECT id, color AS name FROM colors");
while ($row = mysqli_fetch_assoc($res)) {
    $allColors[] = $row;
}

$allSizes = [];
$res = mysqli_query($conn, "SELECT id, size AS name FROM sizes");
while ($row = mysqli_fetch_assoc($res)) {
    $allSizes[] = $row;
}

/* ---------------- FINAL RESPONSE ---------------- */

echo json_encode([
    "status" => "success",
    "products" => $products,
    "tshirts" => $tshirts,
    "trousers" => $trousers,
    "amazingproduct" => $amazingProducts,
    "colors" => $allColors,
    "sizes" => $allSizes
], JSON_UNESCAPED_UNICODE);
