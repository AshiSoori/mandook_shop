import React, { useState } from "react";
import classes from "./ContactForm.module.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        "https://mandook.sooriweb.ir/backend/contact.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="contact-form" style={{ marginTop: "5rem" }}>
      <h2>برای ما پیام بگذارید</h2>
      <form onSubmit={handleSubmit}>
        <div className="row d-flex">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={classes.input}
              placeholder="نام"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={classes.input}
              placeholder="ایمیل"
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={`${classes.message} ${classes.input}`}
              placeholder="پیام"
            ></textarea>
          </div>
        </div>

        <button type="submit" className={`${classes.btn} btn btn-success `}>
          ارسال
        </button>
      </form>

      {status === "loading" && <p>در حال ارسال...</p>}
      {status === "success" && (
        <p style={{ color: "green" }}>پیام شما ارسال شد ✅</p>
      )}
      {status === "error" && (
        <p style={{ color: "red" }}>خطا در ارسال پیام ❌</p>
      )}
    </div>
  );
};

export default ContactForm;
