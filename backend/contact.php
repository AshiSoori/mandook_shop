<?php
header("Content-Type: application/json");

// Get JSON data from React
$data = json_decode(file_get_contents("php://input"), true);

$name    = trim($data['name'] ?? '');
$email   = trim($data['email'] ?? '');
$message = trim($data['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

// Recipient (your admin inbox)
$to = "ashi.soori1990@example.com";

// Subject line
$subject = "New Contact Form Submission";

// Email body
$body = "You have received a new message:\n\n"
      . "Name: $name\n"
      . "Email: $email\n"
      . "Message:\n$message\n";

// Headers
$headers  = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["status" => "success", "message" => "Message sent successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to send email"]);
}
