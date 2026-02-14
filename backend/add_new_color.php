<?php
ob_start(); // Start output buffering
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
// if (!headers_sent()) {
//   echo json_encode(['message' => 'No response generated']);
// }

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');
error_reporting(E_ALL);


include('config.php');
file_put_contents('debug_test.txt', 'PHP script started');


// Read form fields
$color = $_POST['color'] ?? '';

if (!$color ) {
  http_response_code(400);
  echo json_encode(['message' => 'Missing required fields']);
  exit;
}

$sql = "INSERT INTO colors (color)
        VALUES (?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
  error_log("Prepare failed: " . $conn->error);
  http_response_code(500);
  echo json_encode(['message' => 'Database error']);
  exit;
}

$stmt->bind_param("s", $color);
file_put_contents('debug_response.txt', json_encode(['message' => 'Form submitted successfully']));



if ($stmt->execute()) {
  

  echo json_encode(['message' => 'Form submitted successfully']);
} else {
  error_log("Execute failed: " . $stmt->error);
  http_response_code(500);
  echo json_encode(['message' => 'Error submitting form']);
}
file_put_contents('debug_color_php_output.txt', ob_get_contents()); // ✅ Always runs
ob_end_flush();

$stmt->close();
$conn->close();
?>
