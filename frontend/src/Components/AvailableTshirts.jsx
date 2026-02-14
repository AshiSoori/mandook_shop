import React from "react";
import MyCard from "./Card";
import { useContext } from "react";
import { DataContext } from "../store/DataContext";

const AvailableTshirts = () => {
  const { tshirts } = useContext(DataContext);

  return (
    <div className="row">
      {tshirts.map((tshirt) => (
        <div key={tshirt.id} className="col-md-3" style={{ marginTop: "5rem" }}>
          <MyCard key={tshirt.id} data={tshirt} type="Tshirts" />
        </div>
      ))}
    </div>
  );
};

export default AvailableTshirts;
