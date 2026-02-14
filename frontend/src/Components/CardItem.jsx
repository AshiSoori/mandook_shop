import React from "react";
import { useParams } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import CartContext from "../store/cart-context";
import Header from "../Components/Layout/Header";
import NavMenu from "../Components/Layout/NavMenu";
import AddToCard from "./AddToCard";

import { DataContext } from "../store/DataContext";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import classes from "./CardItem.module.css";
// import { idID } from "@mui/material/locale";

const CardItem = () => {
  const { tshirts, trousers, amazingProduct } = useContext(DataContext);
  const cartCtx = useContext(CartContext);

  const BASE_URL = "http://localhost/images/";

  const { type, code, id } = useParams();

  let product;

  if (type === "Tshirts") {
    product = tshirts.find((p) => p.code == parseInt(code));
  } else if (type === "Trousers") {
    product = trousers.find((p) => p.code == parseInt(code));
  } else if (type === "amazingproduct") {
    product = amazingProduct.find((p) => p.code == parseInt(code));
  }

  if (!product) return <div>Product not found</div>;
  let parsedImages = [];

  try {
    parsedImages =
      typeof product.images === "string"
        ? JSON.parse(product.images)
        : Array.isArray(product.images)
          ? product.images
          : [];
  } catch (error) {
    console.error("Error parsing images:", error);
    parsedImages = [];
  }

  if (parsedImages.length === 0) {
    return <div>No images available for this product.</div>;
  }

  const images = parsedImages.map((img) => ({
    original: `${BASE_URL}${img}`,
    thumbnail: `${BASE_URL}${img}`,
  }));

  // const variants = product.variants || [];

  // unique colors from variants
  // const colors = [
  //   ...new Map(variants.map((v) => [v.color_id, v.color])).values(),
  // ];

  // unique sizes from variants
  // const sizes = [...new Map(variants.map((v) => [v.size_id, v.size])).values()];

  const variants = Array.isArray(product.variants) ? product.variants : [];

  // unique colors
  const colors = [
    ...new Map(
      variants.map((v) => [v.color_id, { id: v.color_id, name: v.color }]),
    ).values(),
  ];

  // unique sizes
  const sizes = [
    ...new Map(
      variants.map((v) => [v.size_id, { id: v.size_id, name: v.size }]),
    ).values(),
  ];

  const AddToCardHandler = ({ amount, colorId, sizeId }) => {
    const cartItemId = `${code}-${colorId}-${sizeId}`;

    cartCtx.addItem({
      cartItemId,
      id,
      title: product.title,
      amount,
      colorId,
      sizeId,
      price: product.saleprice,
      src: product.src,
      desc: product.desc,
      code: product.code,
    });
  };

  // const AddToCardHandler = ({ amount, color, size }) => {
  //   console.log("color:", color);
  //   console.log("size:", size);
  //   const cartItemId = `${code}-${color}-${size}`;
  //   console.log(cartItemId);
  //   cartCtx.addItem({
  //     cartItemId,
  //     id: id,
  //     title: product.title,
  //     amount: amount,
  //     color: color,
  //     size: size,
  //     price: product.saleprice,
  //     src: product.src,
  //     desc: product.desc,
  //     code: product.code,
  //   });
  //   console.log(cartCtx);
  // };

  return (
    <>
      <Header />
      <NavMenu />
      <div className="container" style={{ marginTop: "10rem" }}>
        <div className="row d-flex">
          <div className="col-md-3">
            {/* <img src={`${BASE_URL}${product.src}`} alt="" /> */}
            <ImageGallery items={images} style={{ width: "100%" }} />
          </div>
          <div className="col-md-5">
            <div className="row" style={{ marginRight: "5rem" }}>
              <span className="mb-3">نام محصول : {product.title}</span>
              <span>قیمت : {product.saleprice}</span>
            </div>

            {/* <AddToCard
              id={product.id}
              onAddToCart={AddToCardHandler}
              colors={product.colors}
              sizes={product.sizes}
              variants={product.variants}
            /> */}

            {/* <AddToCard
              id={product.id}
              onAddToCart={AddToCardHandler}
              colors={colors}
              sizes={sizes}
              variants={variants}
            /> */}
            <AddToCard
              id={product.id}
              onAddToCart={AddToCardHandler}
              colors={colors}
              sizes={sizes}
              variants={variants}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
