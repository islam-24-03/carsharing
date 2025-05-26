import React, { useState } from "react";

const Contact = () => {
   const [formData, setFormData] = useState({ name: "", email: "", message: "" });
   const [status, setStatus] = useState(null);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("loading");

      try {
         await fetch("https://your-backend-url.com/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
         });
         setStatus("success");
         setFormData({ name: "", email: "", message: "" });
      } catch (error) {
         setStatus("error");
      }
   };

   return (
      <main className="MainContent" id="contact">
         <section className="contact-section">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
               <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
               <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
               <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
               <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending..." : "Send Message"}</button>
            </form>
            {status === "success" && <p className="success-message">Message sent!</p>}
            {status === "error" && <p className="error-message">Something went wrong.</p>}
         </section>
      </main>
   );
};

export default Contact;