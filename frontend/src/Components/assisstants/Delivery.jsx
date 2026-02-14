import React from "react";
import classes from "./guarantee.module.css";

const Delivery = () => {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.innerDiv}>
        <img
          src="/src/assets/delivery.jpg"
          alt="delivery"
          className={classes.img}
        />
        <h6 className={classes.h6}>ارسال سریع و رایگان</h6>
        <p className={classes.p}>
          ارسال رایگان برای خریدهای بالای 2 میلیون تومان و در زمان انتخابی مشتری
          به سریعترین شکل ممکن می‌باشد.
        </p>
      </div>
    </div>
  );
};

export default Delivery;
