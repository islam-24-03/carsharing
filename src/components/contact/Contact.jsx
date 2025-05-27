import React, { useState } from "react";
import './Contact.css';

const Contact = () => {
   const [formData, setFormData] = useState({ 
      name: "", 
      email: "", 
      message: "" 
   });
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
         setTimeout(() => setStatus(null), 3000);
      } catch (error) {
         setStatus("error");
         setTimeout(() => setStatus(null), 3000);
      }
   };

   return (
      <div className="contact-container" id="contact">
         <form onSubmit={handleSubmit} className="contact-form">
            <h3>Contact</h3>
            
            <input
               type="text"
               name="name"
               placeholder="Name"
               value={formData.name}
               onChange={handleChange}
               required
            />
            
            <input
               type="email"
               name="email"
               placeholder="Email"
               value={formData.email}
               onChange={handleChange}
               required
            />
            
            <textarea
               name="message"
               placeholder="Message"
               value={formData.message}
               onChange={handleChange}
               required
               rows="3"
            />
            
            <button 
               type="submit" 
               disabled={status === "loading"}
               className={status === "loading" ? "loading" : ""}
            >
               {status === "loading" ? "Sending..." : "Send"}
            </button>
            
            {status === "success" && <div className="status success">Sent</div>}
            {status === "error" && <div className="status error">Error</div>}
         </form>
      </div>
   );
};

export default Contact;