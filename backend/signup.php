<?php

ini_set('display_errors', 0);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
file_put_contents("debug1.txt", print_r($data, true));

$username = $data['username'] ?? '';
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$pwd  = $data['password'] ?? '';
$pwdrepeat = $data['pwdrepeat'] ?? '';
    include_once('config.php');
   include('signup_functions.php');
if (emptyInputSignup($name,$email,$username,$pwd,$pwdrepeat) !== false) {
     echo json_encode(["status" => "error", "message" => "emptyinput"]);
        exit();
    };

    if (invalidUid($username) !== false) {
echo json_encode(["status" => "error", "message" => "invaliduid"]);
        exit();
    };

    if (invalidEmail($email) !== false) {
       echo json_encode(["status" => "error", "message" => "invalidemail"]);
        exit();
    };

    if (pwdMatch($pwd,$pwdrepeat) !== false) {
echo json_encode(["status" => "error", "message" => "passworddoesnotmatch"]);
        exit();
    };

    if (uidExists($conn,$username,$email) !== false) {
echo json_encode(["status" => "error", "message" => "usernametaken"]);
        exit();
    };


    createUser($conn,$name,$email,$username,$pwd);

?>
