import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavMenu.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function NavMenu() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link " href="#">
                  صفحه اصلی
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/Tshirts" className="nav-link " href="#">
                  تی شرت
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/Trousers" className="nav-link " href="#">
                  شلوار
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/EditProducts" className="nav-link " href="#">
                  کنترل ادمین
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Hoodi" className="nav-link " href="#">
                  هودی
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/About" className="nav-link" href="#">
                  درباره ما
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/ContactUs" className="nav-link " href="#">
                  تماس با ما
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavMenu;
