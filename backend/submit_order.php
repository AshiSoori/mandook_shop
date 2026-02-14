<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include('config.php');

$data = json_decode(file_get_contents("php://input"), true);
file_put_contents("debug2.txt", json_encode($data));

$userId = $data['usersId'] ?? '';
$userName = $data['usersName'] ?? '';
$items  = $data['items'] ?? [];
$address = $data['address'] ?? '';
$totalAmount = $data['totalAmount'] ?? '';
$response = [];

try {
    // Step 1: Insert into orders table
    $stmt1 = $conn->prepare("INSERT INTO orders (usersId) VALUES (?)");
    $stmt1->bind_param("i", $userId);
    if (!$stmt1->execute()) {
        throw new Exception("Failed to insert order");
    }
    $order_id = $conn->insert_id;
    $stmt1->close();

    // Step 2: Insert each item into order_item table
    $stmt2 = $conn->prepare("INSERT INTO order_item (order_id, usersId, usersName, code, title, price, amount,color,size , src, address) VALUES (?, ?, ?, ?, ?, ?, ?,?,?, ?, ?)");
    foreach ($items as $item) {
        $code = $item['code'];
        $title = $item['title'];
        $price = $item['price'];
        $amount = $item['amount'];
        $color = $item['color'];
        $size = $item['size'];
        $src = $item['src'];

        $stmt2->bind_param("iisssssssss", $order_id, $userId, $userName, $code, $title, $price, $amount,$color,$size, $src, $address);
        $stmt2->execute();
    }
    $stmt2->close();


 // Step 3: Calculate total price and update orders table
$stmt3 = $conn->prepare("UPDATE orders SET totalprice = ?  WHERE order_id = ?");
$stmt3->bind_param("ii", $totalAmount, $order_id);
$stmt3->execute();
$stmt3->close();


    echo json_encode(["message" => "Order placed successfully"]);
} catch (Exception $e) {
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}

$conn->close();
?>
