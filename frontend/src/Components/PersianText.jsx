import React from "react";
import { toPersianDigits } from "../utils/toPersianDigits";

const PersianText = ({ children }) => {
  return <>{toPersianDigits(children)}</>;
};

export default PersianText;
