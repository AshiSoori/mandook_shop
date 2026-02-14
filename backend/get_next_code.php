<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

include("config.php");

$result = $conn->query("
    SELECT AUTO_INCREMENT 
    FROM information_schema.TABLES 
    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'products'
");

$row = $result->fetch_assoc();

echo json_encode(["nextCode" => $row['AUTO_INCREMENT']]);

$conn->close();
?>
