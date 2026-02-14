import React from "react";

import { Image } from "react-bootstrap";
import logo from "../assets/logo.png";

import classes from "./Logo.module.css";
function Logo() {
  return (
    <div>
      <img src={logo} className={classes.Logo} alt="" />
    </div>
  );
}

export default Logo;
