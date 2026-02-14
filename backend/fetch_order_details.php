<?php 
session_name('USER_SESSION');
session_start();
header("Access-Control-Allow-Origin: http://localhost:5175");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

ini_set('display_errors', 1);
error_reporting(E_ALL);
include_once('config.php');

if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

$userId = $_SESSION["userId"] ?? null;
$orderId = $_GET["order_id"] ?? null;

if (!$userId || !$orderId) {
    http_response_code(400);
    echo json_encode(["error" => "Missing userId or order_id"]);
    exit;
}

// Fetch order items for the specific order and user
$stmt = mysqli_prepare($conn, "SELECT title, amount, price, color,`size` FROM order_item WHERE usersId = ? AND order_id = ?");
mysqli_stmt_bind_param($stmt, "ii", $userId, $orderId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Query failed"]);
    exit;
}

$orderItems = [];

while ($row = mysqli_fetch_assoc($result)) {
    $orderItems[] = [
        'product_name' => $row['title'],
        'color' => $row['color'],
        'size' => $row['size'],
        'quantity' => $row['amount'],
        'price' => $row['price']
    ];
}

echo json_encode(['items' => $orderItems]);
