import React from "react";
import classes from "./guarantee.module.css";

const Originality = () => {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.innerDiv}>
        <img
          src="/src/assets/originality.jpg"
          alt="delivery"
          className={classes.img}
        />
        <h6 className={classes.h6}>ضمانت اصالت</h6>
        <p className={classes.p}>
          تمامی کالاها اورجینال و با ضمانت اصل بودن از نمایندگی معتبر تهیه و
          ارائه می‌شوند.
        </p>
      </div>
    </div>
  );
};

export default Originality;
