import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const usernameInputRef = useRef();
  const pwdInputRef = useRef();
  const registerHandler = () => {
    e.preventDefault();
  };
  const confirmHandler = async (event) => {
    event.preventDefault();

    const enteredUserName = usernameInputRef.current.value;

    const enteredPwd = pwdInputRef.current.value;

    try {
      const response = await fetch("http://localhost/backend/login.php", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username: enteredUserName,
          password: enteredPwd,
        }),
      });

      const result = await response.json();
      if (result.status === "error") {
        alert("Error: " + result.message);
      } else {
        alert("Success: " + result.message);
        navigate("/");
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  };
  return (
    <div className={classes.Loginmain}>
      <div>
        <form onSubmit={confirmHandler} className={classes.formbox}>
          <div className={classes.inputbox}>
            <label htmlFor="username" style={{ color: "#ffffffff" }}>
              نام کاربری
            </label>
            <input
              type="text"
              name="username"
              ref={usernameInputRef}
              className={classes.forminput}
            />
          </div>

          <br />
          <div className={classes.inputbox}>
            <label htmlFor="password" style={{ color: "#fffefeff" }}>
              رمز عبور{" "}
            </label>
            <input
              type="password"
              name="pwd"
              ref={pwdInputRef}
              className={classes.forminput}
            />
          </div>

          <br />
          <div className={classes.btnbox}>
            <button className={classes.loginbtn} type="submit" name="submit">
              ورود
            </button>
            <Link to="/Signup">
              <button
                className={classes.registerbtn}
                name="register"
                onClick={() => registerHandler}
              >
                <span className={classes.registerlink}>ثبت نام</span>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
