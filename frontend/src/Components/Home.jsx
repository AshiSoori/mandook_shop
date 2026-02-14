import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Layout/Header";
import ResponsiveHeader from "./Layout/ResponsiveHeader";
import NavMenu from "./Layout/NavMenu";
import MainSlider from "./Layout/MainSlider";
import TshirtSwiper from "./TshirtSwiper";
import TrousersSwiper from "./TrousersSwiper";
import AmazingProductsSwiper from "./AmazingProducts";
import Footer from "./Layout/Footer";

import CountdownTimer from "./assisstants/CountdownTimer";
import Guarantee from "./assisstants/Guarantee";
import Delivery from "./assisstants/Delivery";
import Originality from "./assisstants/Originality";
import Refund from "./assisstants/Refund";
import CartProvider from "../store/cartProvider";

import classes from "./Home.module.css";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const banners = document.querySelectorAll(`.${classes.banner}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains(classes.banner1)) {
              entry.target.classList.add("show-top");
            }
            if (entry.target.classList.contains(classes.banner2)) {
              entry.target.classList.add("show-bottom");
            }
            if (entry.target.classList.contains(classes.banner3)) {
              entry.target.classList.add("show-left");
            }
            if (entry.target.classList.contains(classes.banner4)) {
              entry.target.classList.add("show-right");
            }
            observer.unobserve(entry.target); // play once
          }
        });
      },
      { threshold: 0.5 }
    );

    banners.forEach((banner) => observer.observe(banner));

    return () => {
      banners.forEach((banner) => observer.unobserve(banner));
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <ResponsiveHeader />
      ) : (
        <div>
          <Header />
        </div>
      )}

      <NavMenu />
      <MainSlider />
      <div className={`container-fluid  mb-5 ${classes.bannercontainer}`}>
        <div className="container-fluid">
          <div className="row d-flex flex-row mt-5">
            <div
              className={`col-md-4 mt-3 ${classes.banner} ${classes.banner1} `}
            >
              <img
                src="http://localhost/images/main-Trouser.webp"
                alt=""
                className="img-fluid"
              />
              <div className={classes.overlay}>
                {" "}
                <Link to="/Trousers" style={{ textDecoration: "none" }}>
                  <button className={classes.morebtn}>مشاهده بیشتر</button>
                </Link>
              </div>
            </div>

            <div className="col-md-4 mt-3">
              <div className="row d-flex flex-column">
                <div className={`col-12  ${classes.banner} ${classes.banner2}`}>
                  <img
                    src="http://localhost/images/main-Tshirt1.webp"
                    alt=""
                    className="img-fluid"
                  />
                  <div className={classes.overlay}>
                    <Link to="/Tshirts" style={{ textDecoration: "none" }}>
                      <button className={classes.morebtn}>مشاهده بیشتر</button>
                    </Link>
                  </div>
                </div>
                <div
                  className={`col-12 mt-3 ${classes.banner} ${classes.banner3} `}
                >
                  <img
                    src="http://localhost/images/main-Hoodi.avif"
                    alt=""
                    className="img-fluid"
                  />
                  <div className={classes.overlay}>
                    <Link to="/Hoodi" style={{ textDecoration: "none" }}>
                      <button className={classes.morebtn}>مشاهده بیشتر</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`col-md-4 mt-3 ${classes.banner} ${classes.banner4}`}
            >
              <img
                src="http://localhost/images/main-Tshirt.webp"
                alt=""
                className="img-fluid"
              />
              <div className={classes.overlay}>
                <Link to="/Tshirts" style={{ textDecoration: "none" }}>
                  <button className={classes.morebtn}>مشاهده بیشتر</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid  mb-5 " style={{ marginTop: "5rem" }}>
          <div
            className="row d-flex justify-content-center mt-5"
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <h1 className="classes.categoryName"> تی شرت</h1>
          </div>
          <TshirtSwiper />
          <div className="row d-flex justify-content-center ">
            <Link to="/Tshirts" className={classes["see-all"]}>
              مشاهده همه
            </Link>
          </div>
        </div>
      </div>

      <div className="container-fluid  mb-5 " style={{ marginTop: "5rem" }}>
        <div
          className="row d-flex justify-content-center mt-5"
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <h1 className="classes.categoryName"> شلوار</h1>
        </div>
        <TrousersSwiper />
        <div className="row d-flex justify-content-center ">
          <Link to="/Trousers" className={classes["see-all"]}>
            مشاهده همه
          </Link>
        </div>
      </div>
      <div className="container-fluid  mb-5 " style={{ marginTop: "5rem" }}>
        <div
          className="d-flex justify-content-between align-items-center "
          style={{ marginTop: "10rem", marginBottom: "5rem" }}
        >
          <div style={{ marginRight: "3rem" }}>
            <h1 className="classes.categoryName"> شگفت انگیزهای روز</h1>
          </div>
          <div
            className="d-flex align-items-center "
            style={{ marginLeft: "3rem" }}
          >
            <h4 style={{ marginLeft: "2rem" }}>
              تعداد روزهای باقیمانده ثبت سفارش
            </h4>
            <CountdownTimer targetDate="2025-09-15T00:00:00" />
          </div>
        </div>
        <AmazingProductsSwiper />
      </div>

      <div className="container  mb-5 " style={{ marginTop: "5rem" }}>
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ textAlign: "center" }}
        >
          <div className="col-md-3">
            {" "}
            <Guarantee />
          </div>
          <div className="col-md-3">
            <Delivery />
          </div>
          <div className="col-md-3">
            {" "}
            <Originality />
          </div>
          <div className="col-md-3">
            {" "}
            <Refund />
          </div>
        </div>
      </div>
      <div
        className="container-fluid"
        style={{ marginTop: "5rem", padding: "0" }}
      >
        <Footer />
      </div>
    </>
  );
};

export default Home;
