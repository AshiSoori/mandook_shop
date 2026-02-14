import { React, useContext, useState } from "react";
import CartContext from "../store/cart-context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import classes from "./CartIcon.module.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartIcon = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <>
      <Link
        to="/Cart"
        className={classes.cartLink}
        onClick={props.cartContentsHandler}
      >
        <span className={classes.badge}>{numberOfCartItems}</span>
        <ShoppingCartIcon style={{ fontSize: "40px" }} />{" "}
      </Link>
    </>
  );
};

export default CartIcon;
