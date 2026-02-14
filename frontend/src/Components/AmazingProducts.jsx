import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useContext } from "react";
import { DataContext } from "../store/DataContext";
// Import Swiper styles
import "../../node_modules/swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// import required Components

import MyCard from "./Card";

export default function amazingProductsSwiper() {
  const { amazingProduct } = useContext(DataContext);

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        autoplay={true}
        style={{ height: "480px" }}
        breakpoints={{
          425: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {amazingProduct.map((amazingproduct) => (
          <SwiperSlide className="d-flex justify-content-center">
            <MyCard
              key={amazingproduct.id}
              data={amazingproduct}
              type="amazingproduct"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
