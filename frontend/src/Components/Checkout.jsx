import React from "react";
import classes from "./CheckOut.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Addresses from "./Addresses";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../store/cart-context";

const CheckOut = (props) => {
  const cartCtx = useContext(CartContext);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    fetch("http://localhost/backend/checkout_session.php", {
      method: "GET",
      credentials: "include", // 👈 This sends cookies with the request
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Session response:", data);
        if (data.userId) {
          setUserId(data.userId);
        } else {
          alert("please login");
        }
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost/backend/login_session.php", {
      method: "GET",
      credentials: "include", // 👈 This sends cookies with the request
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Session response:", data);
        if (data.username) {
          setUserName(data.username);
        }
      });
  }, []);

  const confirmHandler = async () => {
    if (!cartCtx.address) {
      alert("Please select an address before submitting.");
      return;
    }
    console.log("Submitting order with address:", cartCtx.address);
    const response = await fetch("http://localhost/backend/submit_order.php", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        usersId: userId,
        usersName: userName,
        items: cartCtx.items,
        address: cartCtx.address,
        totalAmount: cartCtx.totalAmount,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      alert("Error: " + result.message);
    } else {
      alert("Success: " + result.message);
    }
    localStorage.removeItem("cartState");
    cartCtx.clearCart();
  };
  return (
    <div className="container-fluid" style={{ marginTop: "5rem" }}>
      <div
        className="row d-flex align-items-center"
        style={{ height: "50px", width: "85%", marginRight: "3rem" }}
      >
        <div className="col-6">
          آدرس مورد نظر برای ارسال سفارش را انتخاب کنید
        </div>
        <div className="col-6" style={{ textAlign: "end" }}>
          <form action="">
            <Link to="/AddAddress">
              <button className="btn btn-success">افزودن آدرس جدید</button>
            </Link>
          </form>
        </div>
      </div>

      <Addresses />

      <button
        type="submit"
        className="btn btn-success"
        style={{ marginRight: "3rem" }}
        onClick={confirmHandler}
      >
        ثبت سفارش
      </button>
    </div>
  );
};

export default CheckOut;
