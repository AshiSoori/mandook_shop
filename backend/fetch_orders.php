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


$userId = $_SESSION["userId"];

///// fetch from orders
$stmt1 = mysqli_prepare($conn, "SELECT * FROM `orders` WHERE `usersId` = ? ORDER BY order_time DESC");
mysqli_stmt_bind_param($stmt1, "i", $userId);
mysqli_stmt_execute($stmt1);
$ordersresult = mysqli_stmt_get_result($stmt1);

if (!$ordersresult) {
    http_response_code(500);
    echo json_encode(["error" => "Query failed"]);
    exit;
}

$orders = [];

while ($row = mysqli_fetch_assoc($ordersresult)) {
    $orderId = $row['order_id'];

    if (!isset($orders[$orderId])) {
        $orders[$orderId] = [];
    }

    $orders[$orderId][] = [
        'order_time' => $row['order_time'],
        'totalprice' => $row['totalprice'],
       
        // Add other fields if needed
    ];
}
/////////////fetch from order_items
$stmt = mysqli_prepare($conn, "SELECT * FROM `order_item` WHERE `usersId` = ?");
mysqli_stmt_bind_param($stmt, "i", $userId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);



if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Query failed"]);
    exit;
}

$orderItemsByOrderId = [];

while ($row = mysqli_fetch_assoc($result)) {
    $orderId = $row['order_id'];

    if (!isset($orderItemsByOrderId[$orderId])) {
        $orderItemsByOrderId[$orderId] = [];
    }

    $orderItemsByOrderId[$orderId][] = [
        'product_name' => $row['title'],
        'quantity' => $row['amount'],
        'price' => $row['price']
        // Add other fields if needed
    ];
}
$response = [
    'orders' => $orders,
    'orderItems' => $orderItemsByOrderId
];

echo json_encode($response);