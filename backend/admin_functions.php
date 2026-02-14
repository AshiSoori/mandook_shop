<?php

function uidExists($conn, $username) {

    $sql = "SELECT * FROM adminusers WHERE adminUserName = ?;";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo json_encode(["status" => "error", "message" => "stmtfailed"]);
        exit();
    }

    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($resultData)) {
        mysqli_stmt_close($stmt);
        return $row;
    }

    mysqli_stmt_close($stmt);
    return false;
}

function emptyInputLogin($username, $pwd) {
    return empty($username) || empty($pwd);
}

function loginUser($conn, $username, $pwd) {

    $user = uidExists($conn, $username);

    if ($user === false) {
        echo json_encode(["status" => "error", "message" => "wrongLogin"]);
        exit();
    }

    $storedPwd = $user['adminPwd'];

    // CASE 1: Password already hashed
    if (password_verify($pwd, $storedPwd)) {

        // Optional: rehash if algorithm changed
        if (password_needs_rehash($storedPwd, PASSWORD_DEFAULT)) {
            $newHash = password_hash($pwd, PASSWORD_DEFAULT);
            $stmt = $conn->prepare(
                "UPDATE adminusers SET adminPwd = ? WHERE adminUserName = ?"
            );
            $stmt->bind_param("ss", $newHash, $username);
            $stmt->execute();
        }

    }
    // CASE 2: Old plain-text password
    elseif ($pwd === $storedPwd) {

        // Upgrade to hash
        $newHash = password_hash($pwd, PASSWORD_DEFAULT);
        $stmt = $conn->prepare(
            "UPDATE adminusers SET adminPwd = ? WHERE adminUserName = ?"
        );
        $stmt->bind_param("ss", $newHash, $username);
        $stmt->execute();

    }
    // CASE 3: Wrong password
    else {
        echo json_encode(["status" => "error", "message" => "wrongLogin"]);
        exit();
    }

    // Start session
    session_name('ADMIN_SESSION');
    session_start();
    $_SESSION['userName'] = $user['adminUserName'];

    echo json_encode(["status" => "success", "message" => "Login successfully"]);
    exit();
}


