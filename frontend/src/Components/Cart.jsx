import React from "react";
import { useContext, useState } from "react";

import Header from "../Components/Layout/Header";
import NavMenu from "../Components/Layout/NavMenu";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import AddAddress from "./AddAddress";

import { Link } from "react-router-dom";
import CheckOut from "./Checkout";

const Cart = (props) => {
  const [isSubmiting, setIssubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isCartContents, setIsCartContents] = useState(false);

  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    if (item.amount < 3) {
      cartCtx.addItem({ ...item, amount: 1 });
    } else {
      alert("you can not have ");
    }
  };

  const checkOutHandler = () => {
    fetch("http://localhost/backend/checkout_session.php", {
      method: "GET",
      credentials: "include", // 👈 This sends cookies with the request
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Session response:", data);
        if (data.userId) {
          setIsCheckOut(true);
          setIsCartContents(false);
        } else {
          alert("لطفا قبل از ادامه دادن وارد حساب کاربری خود شوید");
        }
      });
  };
  const cartContentsHandler = () => {
    setIsCartContents(true);
    setIsCheckOut(false);
  };

  // const submitOrderHandler = async (userData) => {
  //   console.log("Sending userData:", userData);
  //   setIssubmiting(true);

  //   const response = await fetch("http://localhost/backend/submit_order.php", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify(userData),
  //   });

  //   const result = await response.json();
  //   if (!response.ok) {
  //     alert("Error: " + result.message);
  //   } else {
  //     alert("Success: " + result.message);
  //     setDidSubmit(true);
  //   }
  // };

  const totalAmount = cartCtx.totalAmount;

  const cartItems = (
    <>
      {cartCtx.items.map((item) => (
        <tr
          style={{ borderBottom: "1px solid rgba(73, 73, 73, 0.4)" }}
          key={item.id}
        >
          <CartItem
            key={item.id}
            data={item}
            onRemove={cartItemRemoveHandler.bind(null, item.cartItemId)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        </tr>
      ))}
    </>
  );
  let CartContents;
  if (totalAmount === 0) {
    CartContents = (
      <div className="row d-flex justify-content-center mt-5">
        سبد خرید شما خالی است
      </div>
    );
  } else {
    CartContents = (
      <div className="container-fluid">
        <div className="row d-flex text-center pt-5 pb-5">
          <p style={{ fontSize: "2rem" }}>سبد خرید شما</p>
        </div>

        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center">
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th className="text-center">نام محصول</th>
                  <th className="text-center">تعداد</th>
                  <th className="text-center">قیمت واحد</th>
                  <th className="text-center">قیمت کل</th>
                </tr>
                {cartItems}
              </tbody>
            </table>
          </div>
          <div
            style={{
              textAlign: "end",
              marginTop: "3rem",
              marginBottom: "3rem",
            }}
          >
            <div className="mb-3">
              <span>مبلغ کل سبد خرید شما {totalAmount} تومان</span>
            </div>
            <div>
              <button
                className="btn btn-success"
                style={{ width: "20%" }}
                onClick={checkOutHandler}
              >
                ادامه
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header cartContentsHandler={cartContentsHandler} />
      <NavMenu />
      {isCheckOut ? (
        <CheckOut key="checkout" />
      ) : (
        <div key="cart">{CartContents}</div>
      )}

      {didSubmit && alert("thanks for your order")}
    </>
  );
};

export default Cart;
