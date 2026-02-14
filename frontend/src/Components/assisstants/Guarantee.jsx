import React from "react";
import classes from "./guarantee.module.css";

const Guarantee = () => {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.innerDiv}>
        <img
          src="/src/assets/guarantee.jpg"
          alt="Guarantee"
          className={classes.img}
        />
        <h6 className={classes.h6}>خدمات پس از فروش</h6>
        <p className={classes.p}>
          میزبان صدای گرمتان هستیم. هدف تیم پشتیبانی ماندوک تلاش با تمام قوا
          برای ارائه بهترین خدمات به مشتریان عزیز می باشد.
        </p>
      </div>
    </div>
  );
};

export default Guarantee;
