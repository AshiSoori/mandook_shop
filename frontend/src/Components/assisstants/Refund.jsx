import React from "react";
import classes from "./guarantee.module.css";

const Refund = () => {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.innerDiv}>
        <img
          src="/src/assets/refund.png"
          alt="delivery"
          className={classes.img}
        />
        <h6 className={classes.h6}>ضمانت بازگشت کالا</h6>
        <p className={classes.p}>
          تا ۷ روز برای احترام به انتخاب مشتریان کالای خریداری شده برگردانده
          می‌شود.
        </p>
      </div>
    </div>
  );
};

export default Refund;
