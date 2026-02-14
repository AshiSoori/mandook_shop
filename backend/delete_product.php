<?php
// Allow cross-origin requests if needed
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

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);


// Check if ID is provided
if (!isset($data['id'])) {
    echo json_encode(["success" => false, "message" => "No product ID provided"]);
    exit;
}

$productId = intval($data['id']);


include('config.php');
// Prepare and execute the delete query
$stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
$stmt->bind_param("i", $productId);
$success = $stmt->execute([$productId]);

if ($success) {
    echo json_encode(["success" => true, "message" => "Product deleted"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete product"]);
}
?>
