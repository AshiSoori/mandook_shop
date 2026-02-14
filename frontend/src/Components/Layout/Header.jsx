import React from "react";
import Logo from "../Logo";
import SearchBox from "../SearchBox";
import SearchModal from "../SearchModal";
import LoginButton from "../LoginButton";
import CartIcon from "../CartIcon";
import classes from "./Header.module.css";
import Logout from "../Logout";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [showLogout, setShowLogout] = useState(false);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost/backend/login_session.php", {
      method: "GET",
      credentials: "include", // 👈 This sends cookies with the request
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Session response:", data);
        if (data.username) {
          setShowLogout(true);
        }
      });
  }, []);
  return (
    <>
      <header>
        <div className="container">
          <div className="header row mt-3 align-items-center">
            <div className="sec1 col-md-8">
              <div className="row d-flex flex-row align-items-center">
                <div className="col-md-3 d-flex justify-content-end">
                  <Link to="/">
                    <Logo />
                  </Link>
                </div>
                <div className="col-md-9">
                  <SearchBox
                    query={query}
                    setQuery={setQuery}
                    setCategories={setCategories}
                  />
                </div>
              </div>
            </div>
            <div className="sec2 col-md-4">
              <div className="row d-flex flex-row align-items-center">
                <div className="col-md-9 d-flex justify-content-end">
                  <LoginButton />
                  {showLogout && <Logout />}
                </div>
                <div className="col-md-3">
                  <CartIcon cartContentsHandler={props.cartContentsHandler} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {query.trim() && (
        <SearchModal
          query={query}
          setQuery={setQuery}
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </>
  );
};

export default Header;
