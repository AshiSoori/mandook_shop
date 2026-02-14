<?php 
session_name('USER_SESSION');
session_start();
header("Access-Control-Allow-Origin: http://localhost:5175"); // or your React app's URL
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
if (isset($_SESSION['userId'])) {
    echo json_encode(['userId' => $_SESSION['userId']]);        
} else {
    echo json_encode(['userId' => null]);
}

