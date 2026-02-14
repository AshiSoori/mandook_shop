/// MealItem

import React, { useState } from "react";
import { useContext } from "react";
import CartContext from "../store/cart-context";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AddToCard from "./AddToCard";
import { Link } from "react-router-dom";
import classes from "./Card.module.css";
import { toPersianDigits } from "./assisstants/ToPersianDigits";

const MyCard = (props) => {
  const onSale = props.data.onsale;
  const isCardLong = props.type === "Trousers";
  const isAmazingProduct = props.type === "amazingproduct";
  const cardImgClasses = `${classes.cardImg} ${
    isCardLong ? classes.cardImgLong : classes.cardImgAmazing
  }`;

  const BASE_URL = "http://localhost/images/";

  if (onSale == 1) {
    return (
      <Card className={classes.card}>
        <Link to={`/products/${props.type}/${props.data.code}`}>
          <Card.Img
            variant="top"
            src={`${BASE_URL}${props.data.src}`}
            className={`${cardImgClasses} img-fluid`}
          />
        </Link>
        <div className={classes.offspan}>{props.data.offamount}%</div>
        <Card.Body>
          <div className="row d-flex flex-row pt-2 pb-2">
            <Card.Title className={`${classes.cardTitle} col-8`}>
              {props.data.title}
            </Card.Title>

            <div className={`${classes.discountedPrice} col-4`}>
              {toPersianDigits(props.data.realprice) + " " + "تومان"}
            </div>
          </div>
          <div className="row d-flex flex-row pt-2 pb-2 justify-content-center">
            <Card.Text className={`${classes.cardDes} col-8`}>
              {props.data.desc}
            </Card.Text>

            <div className={`${classes.cardPrice} col-4`}>
              {toPersianDigits(props.data.saleprice) + " " + "تومان"}
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card style={{ width: "75%" }} className={classes.card}>
        <Link to={`/products/${props.type}/${props.data.code}`}>
          <Card.Img
            variant="top"
            src={`${BASE_URL}${props.data.src}`}
            className={cardImgClasses}
          />
        </Link>

        <Card.Body>
          <div className="row d-flex flex-row pt-2 pb-2 ">
            <Card.Title className={`${classes.cardTitle} col-6`}>
              {props.data.title}
            </Card.Title>

            <div className={`${classes.cardPrice} col-6`}>
              {toPersianDigits(props.data.realprice) + " " + "تومان"}
            </div>
          </div>
          <div className="row d-flex flex-row pt-2 justify-content-center">
            <Card.Text className={`${classes.cardDes}`}>
              {props.data.desc}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    );
  }
};

export default MyCard;
