import React from "react";
import MyCard from "./Card";
import { useContext } from "react";
import { DataContext } from "../store/DataContext";

const AvailableTrousers = () => {
  const { trousers } = useContext(DataContext);

  return (
    <div className="row">
      {trousers.map((trouser) => (
        <div
          key={trouser.id}
          className="col-md-3"
          style={{ marginTop: "5rem" }}
        >
          <MyCard key={trouser.id} data={trouser} type="Trousers" />
        </div>
      ))}
    </div>
  );
};

export default AvailableTrousers;
