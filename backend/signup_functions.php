<?php

function emptyInputSignup($name,$email,$username,$pwd,$pwdrepeat) {

    if (empty($name) || empty($email) || empty($username) || empty($pwd) || empty($pwdrepeat)) {

        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function invalidUid($username) {
    
    if (!preg_match("/^[a-zA-Z0-9]*$/",$username)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function invalidEmail($email) {
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function pwdMatch($pwd,$pwdrepeat) {
    
    if ($pwd !== $pwdrepeat) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function uidExists($conn,$username,$email) {

    $sql = "SELECT * FROM users WHERE usersUid = ? OR usersEmail = ?;";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {

        echo json_encode(["status" => "error", "message" => "stmtfaild"]);
        exit();
    }

    mysqli_stmt_bind_param($stmt,"ss", $username, $email);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);
    mysqli_stmt_close($stmt);
    if ($row = mysqli_fetch_assoc($resultData)) {
        return $row;
    } else {
        $result = false;
        return $result;
    }


}

function createUser($conn,$name,$email,$username,$pwd) {

    $sql = "INSERT INTO users (usersName,usersEmail,usersUid,usersPwd) values (?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {

    echo json_encode(["status" => "error", "message" => "stmtfaild"]);
    echo mysqli_error($conn);
        exit();
    }

    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt,"ssss", $name,$email,$username,$hashedPwd);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

   echo json_encode(["status" => "success", "message" => "User created successfully"]);
exit();


}



function emptyInputLogin($username,$pwd) {

    if (empty($username) || empty($pwd)) {

        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function loginUser($conn,$username,$pwd) {


    $uidExists = uidExists($conn,$username,$username);

    if( $uidExists === false ) {
            echo json_encode(["status" => "error", "message" => "wrongLogin"]);
        exit();

    } 

    $pwdHashed = $uidExists['usersPwd'];

    $checkPwd = password_verify($pwd,$pwdHashed);

    if ($checkPwd === false) {
        echo json_encode(["status" => "error", "message" => "wrongLogin"]);
        exit();
    } else if ($checkPwd === true) {
        session_name('USER_SESSION');
        session_start();
        $_SESSION['userId'] = $uidExists['usersId'];
        $_SESSION['userName'] = $uidExists['usersName'];
        $_SESSION['userEmail'] = $uidExists['usersEmail'];
        $_SESSION['userUid'] = $uidExists['usersUid'];
        echo json_encode(["status" => "success", "message" => "Login successfully"]);
        exit();
    }
    
}


