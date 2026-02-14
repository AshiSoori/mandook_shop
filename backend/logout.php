<?php
session_name('USER_SESSION');
session_start();
ini_set('display_errors', 0);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:5175");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
session_unset();     // Remove all session variables
session_destroy();   // Destroy the session

echo json_encode(["message" => "Logged out successfully"]);
?>