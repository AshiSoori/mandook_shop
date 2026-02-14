import React from "react";
import { Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";
// import CarouselCaption from "react-bootstrap/CarouselCaption";
import "../Layout/MainSlider.css";
import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider2.jpg";
import slider3 from "../../assets/slider3.jpg";
import finalslider from "../../assets/finalslider3.jpg";

const MainSlider = () => {
  return (
    <div
      className="container-fluid MainSlider"
      style={{ position: "relative" }}
    >
      <img
        className="over-img"
        src={finalslider}
        alt=""
        style={{
          borderRadius: "15px",
          height: "500px",
          marginRight: "47%",
          marginTop: "3%",
          bottom: "-300px",
          position: "absolute",
        }}
      />
      <div className="row d-flex flex-row ">
        <div
          className="col-sm-8 d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundColor: "aliceblue",
            height: "700px",
          }}
        >
          <div className="typewriter">
            <h1>لذت خرید را با ما تجربه کنید...</h1>
          </div>

          <br />

          <p>هر روز یک استایل جدید</p>

          <p>مد را زندگی کن، نه فقط بپوش</p>

          <p>با لباس‌های ما، متفاوت باش</p>

          <p>استایل تو، قانون تو</p>
          <button className="btn btn-shopping">شروع خرید</button>
        </div>
        <div className="col-sm-4 slider-part1"></div>
      </div>
    </div>
    // <Carousel
    //   className="MainSlider"
    //   controls={false}
    //   fade
    //   wrap={true}
    //   slide={true}
    //   infiniteloop="true"
    // >
    //   <Carousel.Item interval={2000}>
    //     <img
    //       className="d-block w-100 "
    //       src={slider1}
    //       alt="First slide"
    //       style={{ width: "100%", height: "500px", objectFit: "cover" }}
    //     />
    //   </Carousel.Item>
    //   <Carousel.Item interval={2000}>
    //     <img
    //       className="d-block w-100 "
    //       src={slider2}
    //       alt="Second slide"
    //       style={{ width: "100%", height: "500px", objectFit: "cover" }}
    //     />
    //   </Carousel.Item>
    //   <Carousel.Item interval={2000}>
    //     <img
    //       className="d-block w-100 "
    //       src={slider3}
    //       alt="Third slide"
    //       style={{ width: "100%", height: "500px", objectFit: "cover" }}
    //     />
    //   </Carousel.Item>
    // </Carousel>
  );
};

export default MainSlider;
