<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust for CORS if needed

$pdo = new PDO("mysql:host=localhost;dbname=mandookshop", "root", "");
$search = $_GET['q'] ?? '';

$stmt = $pdo->prepare("SELECT category,type,code,title,src FROM products WHERE title LIKE ?");
$stmt->execute(["%$search%"]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);
?>

