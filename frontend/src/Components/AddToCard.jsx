//// MealItemForm

import { React, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Input from "./input";

const AddToCard = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();
  const [selectedColorId, setSelectedColorId] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 3
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart({
      amount: enteredAmountNumber,
      colorId: Number(selectedColorId),
      sizeId: Number(selectedSizeId),
    });
  };

  const variants = props.variants || [];

  const colorHasStock = (colorId) => {
    return variants.some((v) => v.color_id === Number(colorId) && v.stock > 0);
  };

  const sizeHasStock = (sizeId) => {
    if (!selectedColorId) return true;

    return variants.some(
      (v) =>
        v.color_id === Number(selectedColorId) &&
        v.size_id === Number(sizeId) &&
        v.stock > 0,
    );
  };

  console.log("PRODUCT ID:", props.id);
  console.log("VARIANTS:", props.variants);
  return (
    <>
      <Form
        className="row"
        style={{ marginTop: "3rem", marginRight: "5rem" }}
        onSubmit={submitHandler}
      >
        <label className="mb-5">
          رنگ
          <select
            value={selectedColorId}
            onChange={(e) => setSelectedColorId(e.target.value)}
            required
          >
            <option value="" disabled>
              انتخاب رنگ
            </option>

            {props.colors.map((color) => (
              <option
                key={color.id}
                value={color.id}
                disabled={!colorHasStock(color.id)}
              >
                {color.name}
                {!colorHasStock(color.id) && " (ناموجود)"}
              </option>
            ))}
          </select>
        </label>
        <label className="mb-5" style={{ marginLeft: "1rem" }}>
          سایز
          <select
            value={selectedSizeId}
            onChange={(e) => setSelectedSizeId(e.target.value)}
            required
          >
            <option value="" disabled>
              انتخاب سایز
            </option>

            {props.sizes.map((size) => (
              <option
                key={size.id}
                value={size.id}
                disabled={!sizeHasStock(size.id)}
              >
                {size.name}
                {!sizeHasStock(size.id) && " (ناموجود)"}
              </option>
            ))}
          </select>
        </label>
        <Input
          ref={amountInputRef}
          label="تعداد   "
          input={{
            id: "amount_" + props.id,
            type: "number",
            min: "1",
            max: "3",
            step: "1",
            defaultValue: "1",
          }}
        />
        <Button
          variant="success"
          className="addToCart"
          style={{ marginTop: "3rem", width: "50%" }}
          type="submit"
        >
          اضافه کردن به سبد خرید
        </Button>
        {!amountIsValid && <p>Error in amount</p>}
      </Form>
    </>
  );
};

export default AddToCard;
