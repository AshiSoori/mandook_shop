import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Layout/Header";
import NavMenu from "../Components/Layout/NavMenu";
import classes from "./Profile.module.css";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/backend/fetch_order_details.php?order_id=${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Parsed data:", data);
        setOrderItems(data.items || []);
        console.log(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  return (
    <>
      <Header />
      <NavMenu />
      <div className="container">
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>شماره سفارش</th>
              <th className={classes.th}>نام محصول</th>
              <th className={classes.th}> رنگ</th>
              <th className={classes.th}>سایز </th>
              <th className={classes.th}>قیمت</th>
              <th className={classes.th}>تعداد</th>
              <th className={classes.th}>قیمت کل</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => (
              <tr key={index}>
                <td className={classes.th}>{id}</td>
                <td className={classes.th}>{item.product_name}</td>
                <td className={classes.th}>{item.color} </td>
                <td className={classes.th}>{item.size} </td>
                <td className={classes.th}>{item.price} تومان</td>
                <td className={classes.th}>{item.quantity}</td>
                <td className={classes.th}>{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderDetail;
