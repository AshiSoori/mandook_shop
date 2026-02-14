<?php
// submit.php



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

file_put_contents("debug.txt", json_encode($data));

$address = $data['address'] ?? '';
$postal  = $data['postalCode'] ?? '';
$city    = $data['city'] ?? '';
$ostan    = $data['ostan'] ?? '';
$number    = $data['number'] ?? '';
$vahed    = $data['vahed'] ?? '';
$usersId =  $data['usersId'] ?? '';

if (!$address || 
!$postal || !$city ) {
  http_response_code(400);
  echo json_encode(['message' => 'Missing required fields']);
  exit;
}
if (!$usersId) {
  http_response_code(401);
  echo json_encode(['message' => 'please first log in']);
  exit;
}

$sql=("INSERT INTO address (usersId,address, city, postalcode,ostan,number,vahed) VALUES (?,?, ?, ?,?,?,?)");
$stmt = $conn->prepare($sql);

if (!$stmt) {
    error_log("Prepare failed: " . $conn->error);
    http_response_code(500);
    echo json_encode(['message' => 'Database error']);
    exit;
}


$stmt->bind_param("issssss",$usersId, $address, $city, $postal,$ostan,$number,$vahed);


if ($stmt->execute()) {
    echo json_encode(['message' => 'Form submitted successfully']);
} else {
    error_log("Execute failed: " . $stmt->error);
    http_response_code(500);
    echo json_encode(['message' => 'Error submitting form']);
}

$stmt->close();
$conn->close();
?>
