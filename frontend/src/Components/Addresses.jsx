import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import CartContext from "../store/cart-context";
import classes from "./Addresses.module.css";
const Addresses = () => {
  const cartCtx = useContext(CartContext);
  const [addresses, setAddresses] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    const selectedAddress = event.target.value;
    setSelectedOption(selectedAddress);
  };
  useEffect(() => {
    fetch("http://localhost/backend/fetch_address.php", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        console.log("Raw response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Parsed data:", data);
        setAddresses(data);
        if (data.length > 0) {
          // setSelectedOption(String(data[0].address_id)); // Select first address
          const firstAddress = `${data[0].address || ""}, ${
            data[0].city || ""
          }, ${data[0].postalcode || ""}`;
          setSelectedOption(firstAddress);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  cartCtx.address = selectedOption;

  return (
    <div className="container-fluid" style={{ marginTop: "2rem" }}>
      <ul>
        {addresses ? (
          addresses.map((item, index) => (
            <li key={index} className={classes.listItem}>
              <label>
                <input
                  type="radio"
                  name="myRadioGroup"
                  value={String(
                    `${item.ostan || ""},${item.city || ""}, ${
                      item.address || ""
                    }, ${item.number || ""}, ${item.vahed || ""}, ${
                      item.postalcode || ""
                    }`
                  )}
                  checked={
                    selectedOption ===
                    String(
                      `${item.ostan || ""},${item.city || ""}, ${
                        item.address || ""
                      }, ${item.number || ""}, ${item.vahed || ""}, ${
                        item.postalcode || ""
                      }`
                    )
                  }
                  onChange={handleOptionChange}
                />
                <span style={{ marginRight: "8px" }}>
                  {item.ostan} {item.city} {item.address} {item.number}{" "}
                  {item.vahed} {item.postalode}
                </span>
              </label>
            </li>
          ))
        ) : (
          <li>در حال بارگذاری آدرس‌ها...</li>
        )}
      </ul>
    </div>
  );
};

export default Addresses;
