import React, { useState, useEffect } from "react";
import Header from "./Layout/Header";
import ResponsiveHeader from "./Layout/ResponsiveHeader";
import NavMenu from "./Layout/NavMenu";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import MailIcon from "@mui/icons-material/Mail";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import PostAddIcon from "@mui/icons-material/PostAdd";
import classes from "./ContactUs.module.css";
import Footer from "./Layout/Footer";
import ContactForm from "./ContactForm";

const ContactUs = () => {
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

  return (
    <div>
      {isMobile ? (
        <ResponsiveHeader />
      ) : (
        <div>
          <Header />
        </div>
      )}
      <NavMenu />
      <div className="container mb-5 mt-5">
        <div className="row d-flex flex-row d-flex flex-row justify-content-center align-items-center text-center">
          <div className="col-md-6 ">
            <h1 style={{ marginBottom: "5rem" }}>میزبان صدای گرم شما هستیم</h1>
            <div>
              <LocationPinIcon />
              <span
                style={{
                  display: "inline-block",
                  marginBottom: "5rem",
                  fontSize: "1.5rem",
                }}
              >
                تهران، خیابان شهران، خیابان یکم
              </span>
            </div>
            <div className="d-flex justify-content-center">
              <div style={{ marginLeft: "3rem" }}>
                <MailIcon style={{ fontSize: "2rem", fill: "green" }} />
                info@gmail.com
              </div>

              <div style={{ marginLeft: "3rem" }}>
                <PhoneEnabledIcon style={{ fontSize: "2rem", fill: "green" }} />
                021999999
              </div>

              <div style={{ marginLeft: "3rem" }}>
                <PostAddIcon style={{ fontSize: "2rem", fill: "green" }} />
                4588556655
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d809.4345391047824!2d51.288877269624706!3d35.75724008659204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDQ1JzI2LjEiTiA1McKwMTcnMjIuMyJF!5e0!3m2!1sen!2s!4v1766396530825!5m2!1sen!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="row mt-5 mb-5">
          <div className="col-md-3 text-center">
            <img
              src="/src/assets/refund.png"
              alt="delivery"
              className={classes.img}
            />
            <h6 className="mt-3">ضمانت بازگشت کالا</h6>
          </div>
          <div className="col-md-3 text-center">
            <img
              src="/src/assets/originality.jpg"
              alt="delivery"
              className={classes.img}
            />
            <h6 className="mt-3">ضمانت اصالت</h6>
          </div>
          <div className="col-md-3 text-center">
            <img
              src="/src/assets/guarantee.jpg"
              alt="delivery"
              className={classes.img}
            />
            <h6 className="mt-3">خدمات پس از فروش</h6>
          </div>
          <div className="col-md-3 text-center">
            <img
              src="/src/assets/delivery.jpg"
              alt="delivery"
              className={classes.img}
            />
            <h6 className="mt-3">تحویل سریع و آسان</h6>
          </div>
        </div>
        <div className="row">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
