


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
$code = $_POST['code'] ?? '';
$title = $_POST['title'] ?? '';
$onsale = $_POST['onsale'] ?? '';
$realprice = $_POST['realprice'] ?? '';
$saleprice = $_POST['saleprice'] ?? '';
$offamount = $_POST['offamount'] ?? '';
$desc = $_POST['desc'] ?? '';
$onsupersale = $_POST['onsupersale'] ?? '';
$type = $_POST['type'] ?? '';
$category = $_POST['category'] ?? '';

// Handle file uploads
$src = $_FILES['src']['name'] ?? '';
// $images = isset($_FILES['images']) ? implode(',', array_column($_FILES['images']['name'], 0)) : '';
$images = '';
if (isset($_FILES['images'])) {
  $imageNames = [];
  foreach ($_FILES['images']['name'] as $name) {
    $imageNames[] = $name;
  }
  $images = json_encode($imageNames);
  file_put_contents('debug_images.txt', $images); // ✅ Convert to JSON string
}



if ( !$title || !isset($onsale) || !$realprice || !$saleprice || !isset($offamount) || !$desc || !$src || !$images || !isset($onsupersale) || !$type || !$category) {
  http_response_code(400);
  echo json_encode(['message' => 'Missing required fields']);
  exit;
}



// Save files (optional)
move_uploaded_file($_FILES['src']['tmp_name'], '../images/' . $_FILES['src']['name']);
foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
  move_uploaded_file($tmp_name, '../images/' . $_FILES['images']['name'][$key]);
}

// Insert into database
$sql = "INSERT INTO products (title, onsale, realprice, saleprice, offamount, `desc`, src, images, onsupersale, `type`, category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
  error_log("Prepare failed: " . $conn->error);
  http_response_code(500);
  echo json_encode(['message' => 'Database error']);
  exit;
}

$stmt->bind_param("siiiisssiss", $title, $onsale, $realprice, $saleprice, $offamount, $desc, $src, $images, $onsupersale, $type, $category);
file_put_contents('debug_response.txt', json_encode(['message' => 'Form submitted successfully']));



if ($stmt->execute()) {
   $newId = $conn->insert_id;   // auto increment id

    // Now update code using that id
    $update = $conn->prepare("UPDATE products SET code = ? WHERE id = ?");
    $update->bind_param("si", $newId, $newId);
    $update->execute();


  echo json_encode(['message' => 'Form submitted successfully']);
} else {
  error_log("Execute failed: " . $stmt->error);
  http_response_code(500);
  echo json_encode(['message' => 'Error submitting form']);
}
file_put_contents('debug_php_output.txt', ob_get_contents()); // ✅ Always runs
ob_end_flush();

$stmt->close();
$conn->close();
?>
