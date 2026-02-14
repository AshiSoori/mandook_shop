import React from "react";
import classes from "./CheckOut.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Header from "./Layout/Header";
import NavMenu from "./Layout/NavMenu";

const AddAddress = (props) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch("http://localhost/backend/checkout_session.php", {
      method: "GET",
      credentials: "include", // 👈 This sends cookies with the request
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Session response:", data);
        if (data.userId) {
          setUserId(data.userId);
        }
      });
  }, []);

  const addressInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const ostanInputRef = useRef();
  const numberInputRef = useRef();
  const vahedInputRef = useRef();

  const confirmHandler = async (event) => {
    event.preventDefault();
    const enteredAddress = addressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredOstn = ostanInputRef.current.value;
    const enteredNumber = numberInputRef.current.value;
    const enteredVahed = vahedInputRef.current.value;

    const response = await fetch(
      "http://localhost/backend/submit_address.php",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          usersId: userId,
          address: enteredAddress,
          city: enteredCity,
          postalCode: enteredPostalCode,
          ostan: enteredOstn,
          number: enteredNumber,
          vahed: enteredVahed,
        }),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      alert("Error: " + result.message);
    } else {
      alert("Success: " + result.message);
    }
  };
  return (
    <>
      <Header />
      <NavMenu />
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className="container mt-5">
          <div className="row d-flex align-items-center">
            <div className="col-6">
              {" "}
              <label htmlFor="ostan">استان</label>
              <input
                type="text"
                id="ostan"
                name="ostan"
                ref={ostanInputRef}
                className={classes.input}
              />
            </div>
            <div className="col-6">
              {" "}
              <label htmlFor="city">شهر</label>
              <input
                type="text"
                id="city"
                name="city"
                ref={cityInputRef}
                className={classes.input}
              />
            </div>

            <div className="col-12">
              {" "}
              <label htmlFor="address">آدرس</label>
              <input
                type="text"
                id="address"
                name="address"
                ref={addressInputRef}
                className={classes.input}
              />
            </div>
            <div className="col-4">
              {" "}
              <label htmlFor="number"> پلاک</label>
              <input
                type="text"
                id="number"
                name="number"
                ref={numberInputRef}
                className={classes.input}
              />
            </div>
            <div className="col-4">
              {" "}
              <label htmlFor="vahed"> واحد</label>
              <input
                type="text"
                id="vahed"
                name="vahed"
                ref={vahedInputRef}
                className={classes.input}
              />
            </div>
            <div className="col-4">
              {" "}
              <label htmlFor="postal">کد پستی</label>
              <input
                type="text"
                id="postal"
                name="postal"
                ref={postalCodeInputRef}
                className={classes.input}
              />
            </div>
          </div>
        </div>

        <div className={classes.actions}>
          {/* <button type="button" className={classes.cancel}>
            برگشت
          </button> */}

          <button className={classes.submit} type="submit">
            ثبت آدرس جدید
          </button>
        </div>
      </form>
    </>
  );
};

export default AddAddress;
