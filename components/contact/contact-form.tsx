import React, { useState } from "react";
import classes from "./contact-form.module.css";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error while submitting the contact form:", error);
    }
  };

  return (
    <div className={classes.container}>
      {submitted ? (
        <p>Thank you! Your message has been submitted.</p>
      ) : (
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.name}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={classes.email}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={classes.message}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button className={classes.buttons} type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
