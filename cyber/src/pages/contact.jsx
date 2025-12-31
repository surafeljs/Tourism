import React, { useEffect, useState } from "react";
import "../styles/Contact.css";


const initialState = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Validation helpers (ported from original)
  const getFieldName = (key) =>
    key.charAt(0).toUpperCase() + key.slice(1);

  const validateEmail = (val) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val.trim());
  };

  const validatePhone = (val) => {
    if (val.trim() === "") return true;
    const re =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}$/;
    return re.test(val.trim());
  };

  const checkLength = (val, min, max) =>
    val.length >= min && val.length <= max;

  const runValidation = (field, val) => {
    // returns error message or empty string
    switch (field) {
      case "fullName":
        if (val.trim() === "") return `${getFieldName(field)} is required`;
        if (!checkLength(val.trim(), 2, 50))
          return `${getFieldName(field)} must be at least 2 characters`;
        return "";
      case "email":
        if (val.trim() === "") return `${getFieldName(field)} is required`;
        if (!validateEmail(val)) return "Email is not valid";
        return "";
      case "phone":
        if (!validatePhone(val)) return "Phone number is not valid";
        return "";
      case "subject":
        if (val.trim() === "") return `${getFieldName(field)} is required`;
        if (!checkLength(val.trim(), 5, 100))
          return `${getFieldName(field)} must be at least 5 characters`;
        return "";
      case "message":
        if (val.trim() === "") return `${getFieldName(field)} is required`;
        if (!checkLength(val.trim(), 10, 1000))
          return `${getFieldName(field)} must be at least 10 characters`;
        return "";
      default:
        return "";
    }
  };

  const validateAll = () => {
    const nextErrors = {};
    Object.keys(values).forEach((k) => {
      const err = runValidation(k, values[k]);
      if (err) nextErrors[k] = err;
    });
    // allow empty phone
    if (values.phone.trim() === "") delete nextErrors.phone;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((s) => ({ ...s, [name]: value }));
    // live-validate when user types (similar to input listeners in original)
    if (touched[name]) {
      const err = runValidation(name, value);
      if (name === "phone" && value.trim() === "") {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.phone;
          return copy;
        });
      } else {
        setErrors((prev) => ({ ...prev, [name]: err || undefined }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const err = runValidation(name, values[name]);
    if (name === "phone" && values.phone.trim() === "") {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.phone;
        return copy;
      });
    } else {
      setErrors((prev) => ({ ...prev, [name]: err || undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // mark all touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });

    if (!validateAll()) return;

    // simulate submission
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setValues(initialState);
      setErrors({});
      setTouched({});
      // hide success after 5s
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  // Scroll-to-top button visibility
  useEffect(() => {
    const onScroll = () => {
      setShowScrollBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  // Close mobile nav on window resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="contact-page">
      

      <h1 className="page-title">Contact Us</h1>

      <main className="contact-container">
        <div className="center-content">
          <section className="contact-form-section">
            <h2>Get in Touch</h2>
            <form
              className="contact-form"
              id="contactForm"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Full Name */}
              <div
                className={`form-group ${
                  touched.fullName && errors.fullName
                    ? "error"
                    : touched.fullName && !errors.fullName
                    ? "success"
                    : ""
                }`}
              >
                <label htmlFor="fullName">
                  Full Name <span className="required-marker">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i className="fas fa-check-circle validation-icon"></i>
                <i className="fas fa-exclamation-circle validation-icon"></i>
                <div className="error-message">
                  {errors.fullName || "Please enter your full name (min 2 characters)"}
                </div>
              </div>

              {/* Email */}
              <div
                className={`form-group ${
                  touched.email && errors.email
                    ? "error"
                    : touched.email && !errors.email
                    ? "success"
                    : ""
                }`}
              >
                <label htmlFor="email">
                  Email Address <span className="required-marker">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i className="fas fa-check-circle validation-icon"></i>
                <i className="fas fa-exclamation-circle validation-icon"></i>
                <div className="error-message">
                  {errors.email || "Please enter a valid email address"}
                </div>
              </div>

              {/* Phone */}
              <div
                className={`form-group ${
                  touched.phone && errors.phone
                    ? "error"
                    : touched.phone && !errors.phone
                    ? "success"
                    : ""
                }`}
              >
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i className="fas fa-check-circle validation-icon"></i>
                <i className="fas fa-exclamation-circle validation-icon"></i>
                <div className="error-message">
                  {errors.phone || "Please enter a valid phone number"}
                </div>
              </div>

              {/* Subject */}
              <div
                className={`form-group ${
                  touched.subject && errors.subject
                    ? "error"
                    : touched.subject && !errors.subject
                    ? "success"
                    : ""
                }`}
              >
                <label htmlFor="subject">
                  Subject <span className="required-marker">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter message subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i className="fas fa-check-circle validation-icon"></i>
                <i className="fas fa-exclamation-circle validation-icon"></i>
                <div className="error-message">
                  {errors.subject || "Please enter a subject (min 5 characters)"}
                </div>
              </div>

              {/* Message */}
              <div
                className={`form-group ${
                  touched.message && errors.message
                    ? "error"
                    : touched.message && !errors.message
                    ? "success"
                    : ""
                }`}
              >
                <label htmlFor="message">
                  Message <span className="required-marker">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your travel plans, questions, or how we can help you discover Ethiopia..."
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
                <i className="fas fa-check-circle validation-icon"></i>
                <i className="fas fa-exclamation-circle validation-icon"></i>
                <div className="error-message">
                  {errors.message || "Please enter a message (min 10 characters)"}
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                id="submitBtn"
                disabled={loading}
              >
                {loading ? <><i className="fas fa-spinner fa-spin"></i> Sending...</> : "Send Message"}
              </button>

              <div
                className="success-message"
                id="successMessage"
                style={{ display: showSuccess ? "block" : "none" }}
              >
                <i className="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.
              </div>
            </form>

            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="info-item">
                <strong>Email:</strong>
                <span>info@tourismethio.com</span>
              </div>
              <div className="info-item">
                <strong>Phone:</strong>
                <span>+251 11 123 4567</span>
              </div>
              <div className="info-item">
                <strong>Address:</strong>
                <span>4 killo, Addis Ababa, Ethiopia</span>
              </div>
              <div className="info-item">
                <strong>Hours:</strong>
                <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer>
        &copy; 2025 Tourism Ethiopia. All rights reserved.
      </footer>

      <button
        id="scrollTopBtn"
        aria-label="Scroll back to top"
        style={{ display: showScrollBtn ? "block" : "none" }}
        onClick={scrollToTop}
      >
        ↑
      </button>
    </div>
  );
}