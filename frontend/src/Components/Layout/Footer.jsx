import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className="d-flex flex-row">
        <div
          className="col-md-3"
          style={{
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <h6 className={classes.title}>خرید از ماندوک</h6>
          <Link to="/Tshirts" className={classes.footerLink}>
            تی شرت
          </Link>
          <br />
          <Link to="/Trousers" className={classes.footerLink}>
            شلوار
          </Link>
          <br />
          <Link to="/Hoodi" className={classes.footerLink}>
            هودی
          </Link>
        </div>
        <div
          className="col-md-3"
          style={{
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <h6 className={classes.title}>خدمات مشتریان</h6>
          <Link to="/" className={classes.footerLink}>
            پرسش های متداول{" "}
          </Link>
          <br />
          <Link to="/" className={classes.footerLink}>
            راهنمای خرید
          </Link>
          <br />
          <Link to="/" className={classes.footerLink}>
            شرایط بازگشت
          </Link>
        </div>
        <div
          className="col-md-3"
          style={{
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <h6 className={classes.title}>اطلاعات ماندوک </h6>
          <Link to="/" className={classes.footerLink}>
            درباره ما
          </Link>
          <br />
          <Link to="/" className={classes.footerLink}>
            تماس با ما
          </Link>
        </div>
        <div
          className="col-md-3"
          style={{
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <h6 className={classes.title}> منتظر شنیدن صدای گرمتان هستیم</h6>
          <Link className={classes.footerLink}>تلفن: 0219999999</Link>
          <br />
          <a
            href="mailto:ashi.soori1990@gmail.com"
            className={classes.footerLink}
          >
            ایمیل: info@gmail.com
          </a>
          <a
            href="https://wa.me/989126218223"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.sociallink}
          >
            <WhatsAppIcon style={{ fontSize: "2rem", color: "#25D366" }} />
          </a>
          <a
            href="https://t.me/@ashisoori"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.sociallink}
          >
            <TelegramIcon style={{ fontSize: "2rem", color: "#27A7E7" }} />{" "}
          </a>
          <a
            href="mailto:ashi.soori1990@gmail.com"
            className={classes.sociallink}
          >
            <EmailIcon style={{ fontSize: "2rem", color: "#e4f6ffff" }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
