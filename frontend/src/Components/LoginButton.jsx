import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import classes from "./LoginButton.module.css";
import Button from "@mui/material/Button";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";

function LoginButton() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("http://localhost/backend/login_session.php", {
      method: "GET",
      credentials: "include", // 👈 This sends cookies with the request
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Session response:", data);
        if (data.username) {
          setUsername(data.username);
        }
      });
  }, []);

  if (username) {
    return (
      <Link to="/Profile">
        <Button
          variant="contained"
          startIcon={
            <PersonOutlineOutlinedIcon style={{ marginLeft: "10px" }} />
          }
          fontSize="2rem"
          className={classes.loginBtn}
        >
          <span style={{ fontFamily: "Vazirmatn", marginLeft: "10px" }}>
            سلام
          </span>
          <span lang="en">{`${username}`}</span>
        </Button>
      </Link>
    );
  } else {
    return (
      <Link to="/Login">
        <Button
          variant="contained"
          startIcon={
            <PersonOutlineOutlinedIcon style={{ marginLeft: "10px" }} />
          }
          fontSize="2rem"
          className={classes.loginBtn}
        >
          <span style={{ fontFamily: "Vazirmatn" }}> ورود / ثبت نام</span>
        </Button>
      </Link>
    );
  }
}

export default LoginButton;
