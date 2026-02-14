// src/utils/numberUtils.js

export const toPersianDigits = (input) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input.toString().replace(/\d/g, (d) => persianDigits[d]);
};
