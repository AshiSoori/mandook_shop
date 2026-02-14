import React from "react";
import Logo from "../Logo";
import LoginButton from "../LoginButton";
import CartIcon from "../CartIcon";

const ResponsiveHeader = () => {
  return (
    <div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-4">
            <Logo />
          </div>
          <div className="col-8">
            <div className="row d-flex align-items-center">
              <div className="col-8 d-flex justify-content-end">
                <LoginButton />
              </div>
              <div className="col-4">
                <CartIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveHeader;
