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
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
file_put_contents("debug1.txt", print_r($data, true));

$username = $data['username'] ?? '';
$pwd  = $data['password'] ?? '';

    include_once('config.php');
include_once('signup_functions.php');

     if (emptyInputLogin($username,$pwd) !== false) {
        echo json_encode(["status" => "error", "message" => "emptyinput"]);
        exit();
    }

    loginUser($conn,$username,$pwd);

