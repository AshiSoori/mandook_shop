import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Components/Layout/Header";
import NavMenu from "../Components/Layout/NavMenu";
import classes from "./Profile.module.css";
import { Link } from "react-router-dom";
import PersianText from "./PersianText";

const Profile = () => {
  const { id } = useParams();

  const [groupedOrders, setGroupedOrders] = useState({});
  useEffect(() => {
    fetch("http://localhost/backend/fetch_orders.php", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        console.log("Raw response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Parsed data:", data);
        setGroupedOrders(data.orders);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  function gregorian_to_jalali(gy, gm, gd) {
    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = gm > 2 ? gy + 1 : gy;
    days =
      355666 +
      365 * gy +
      ~~((gy2 + 3) / 4) -
      ~~((gy2 + 99) / 100) +
      ~~((gy2 + 399) / 400) +
      gd +
      g_d_m[gm - 1];
    jy = -1595 + 33 * ~~(days / 12053);
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += ~~((days - 1) / 365);
      days = (days - 1) % 365;
    }
    if (days < 186) {
      jm = 1 + ~~(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + ~~((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    return [jy, jm, jd];
  }

  function convertOrderTimeToJalali(orderTime) {
    const date = new Date(orderTime);
    const gy = date.getFullYear();
    const gm = date.getMonth() + 1;
    const gd = date.getDate();
    const [jy, jm, jd] = gregorian_to_jalali(gy, gm, gd);
    return `${jy}/${jm}/${jd}`;
  }

  return (
    <>
      <Header />
      <NavMenu />
      <div className="container">
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>تاریخ</th>
              <th className={classes.th}>کد سفارش</th>
              <th className={classes.th}>قیمت</th>
              <th className={classes.th}>جزئیات</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedOrders).map(([orderId, orderDetails]) =>
              orderDetails.map((order, index) => (
                <tr key={`${orderId}-${index}`}>
                  <td className={classes.th}>
                    <PersianText>
                      {convertOrderTimeToJalali(order.order_time)}
                    </PersianText>
                  </td>
                  <td className={classes.th}>
                    <PersianText>{orderId}</PersianText>
                  </td>
                  <td className={classes.th}>
                    <span className="ml-3">
                      <PersianText>{order.totalprice}</PersianText>
                    </span>{" "}
                    تومان
                  </td>
                  <td className={classes.th}>
                    <Link
                      to={`/orders/${orderId}`}
                      style={{ color: "#578e7e", textDecoration: "none" }}
                    >
                      مشاهده{" "}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Profile;
