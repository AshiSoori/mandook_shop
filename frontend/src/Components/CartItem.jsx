import React from "react";
import classes from "./CartItem.module.css";
import { Height } from "@mui/icons-material";

const CartItem = (props) => {
  const BASE_URL = "http://localhost/images/";
  return (
    <>
      <td className="text-center">
        <img
          src={`${BASE_URL}${props.data.src}`}
          alt=""
          style={{ width: "150px", marginBottom: "3rem", marginTop: "3rem" }}
        />
      </td>
      <td className="text-center">
        <p>
          {props.data.desc} {props.data.size} {props.data.color}
        </p>
      </td>
      <td className="text-center">
        <p>{props.data.amount}</p>
      </td>
      <td className="text-center">
        <p>{props.data.price}</p>
      </td>
      <td className="text-center">
        <p>{props.data.price * props.data.amount}</p>
      </td>

      <td>
        <button onClick={props.onAdd} className={classes.actionBtnAdd}>
          +
        </button>
        <button onClick={props.onRemove} className={classes.actionBtnRemove}>
          -
        </button>
      </td>
    </>
  );
};

export default CartItem;
