import React from "react";
import { useState } from "react";
import { useRef } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const nameInputRef = useRef();
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const pwdInputRef = useRef();
  const pwdrepeatInputRef = useRef();
  const confirmHandler = async (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserName = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPwd = pwdInputRef.current.value;
    const enteredPwdrepeat = pwdrepeatInputRef.current.value;
    try {
      const response = await fetch("http://localhost/backend/signup.php", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: enteredName,
          username: enteredUserName,
          email: enteredEmail,
          password: enteredPwd,
          pwdrepeat: enteredPwdrepeat,
        }),
      });

      const result = await response.json();
      if (result.status === "error") {
        alert("Error: " + result.message);
      } else {
        alert("Success: " + result.message);
        navigate("/Login");
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  };
  return (
    <div className={classes.Signupnmain}>
      <form onSubmit={confirmHandler} className={classes.formbox}>
        <div className={classes.inputbox}>
          <label htmlFor="name" style={{ color: "#ffffffff" }}>
            نام
          </label>
          <input
            type="text"
            name="name"
            ref={nameInputRef}
            className={classes.forminput}
          />
        </div>
        <br />
        <div className={classes.inputbox}>
          <label htmlFor="username" style={{ color: "#fdfdfdff" }}>
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
          <label htmlFor="email" style={{ color: "#ffffffff" }}>
            ایمیل
          </label>
          <input
            type="text"
            name="email"
            ref={emailInputRef}
            className={classes.forminput}
          />
        </div>
        <br />
        <div className={classes.inputbox}>
          <label htmlFor="pwd" style={{ color: "#ffffffff" }}>
            رمز عبور
          </label>
          <input
            type="password"
            name="pwd"
            ref={pwdInputRef}
            className={classes.forminput}
          />
        </div>
        <br />
        <div className={classes.inputbox}>
          <label htmlFor="pwdrepeat" style={{ color: "#ffffffff" }}>
            تکرار رمزعبور
          </label>
          <input
            type="password"
            name="pwdrepeat"
            ref={pwdrepeatInputRef}
            className={classes.forminput}
          />
        </div>
        <br />
        <div className={classes.btnbox}>
          <button className={classes.loginbtn} type="submit">
            ثبت نام
          </button>
          <Link to="/Login">
            <button
              className={classes.registerbtn}
              name="backtologin"
              onClick={() => registerHandler}
            >
              <span className={classes.registerlink}>برگشت به صفحه ورود </span>
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
