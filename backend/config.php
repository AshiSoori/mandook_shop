<?php

$host = "localhost";
$db = "mandookshop";
$user = "root";
$pass = "";

$conn = mysqli_connect($host,$user,"",$db);

if (mysqli_connect_errno()){
    die ("connection faild" . mysqli_connect_error());
}


