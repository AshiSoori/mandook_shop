import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../store/cart-context";
import Button from "@mui/material/Button";
import classes from "./LoginButton.module.css";

const Logout = () => {
  const navigate = useNavigate();
  const confirmHandler = () => {
    fetch("http://localhost/backend/logout.php", {
      method: "POST",
      credentials: "include", // 👈 Important to clear the session cookie
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message); // "Logged out successfully"

        window.location.href = "/";
      });
    localStorage.removeItem("cartState");
    cartCtx.clearCart();
  };
  return (
    <div>
      <Button
        onClick={confirmHandler}
        className={classes.loginBtn}
        variant="contained"
        fontSize="2rem"
        style={{ marginRight: "5px" }}
      >
        <span style={{ fontFamily: "Vazirmatn" }}> خروج</span>
      </Button>
    </div>
  );
};

export default Logout;
