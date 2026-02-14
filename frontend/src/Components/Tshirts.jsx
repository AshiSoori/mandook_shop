import React, { useState, useEffect } from "react";
import Header from "./Layout/Header";
import ResponsiveHeader from "./Layout/ResponsiveHeader";
import NavMenu from "./Layout/NavMenu";
import Footer from "./Layout/Footer.jsx";

import AvailableTshirts from "./AvailableTshirts";

const Tshirts = () => {
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
      <div className="container-fluid mb-5">
        <div className="row d-flex flex-row">
          <AvailableTshirts />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tshirts;
