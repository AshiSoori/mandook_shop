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


$stmt = mysqli_prepare($conn, "SELECT * FROM `address` WHERE `usersId` = ?");
mysqli_stmt_bind_param($stmt, "i", $userId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);



if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Query failed"]);
    exit;
}
$addresses =[];

while ($row = mysqli_fetch_assoc($result)) {
    $addresses[] = $row; 
}

echo json_encode($addresses);