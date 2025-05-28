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
         const response = await fetch("https://your-backend-url.com/api/contact", {
            method: "POST",
            headers: { 
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });
         
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         
         setStatus("success");
         setFormData({ name: "", email: "", message: "" });
         
         // Reset status after 3 seconds
         setTimeout(() => setStatus(null), 3000);
      } catch (error) {
         console.error('Error:', error);
         setStatus("error");
         setTimeout(() => setStatus(null), 3000);
      }
   };

   return (
      <main className="contact-container" id="contact">
         <section className="contact-card">
            <div className="contact-header">
               <h2>Contact Us</h2>
               <p>We'd love to hear from you!</p>
            </div>
            
            <form onSubmit={handleSubmit} className="contact-form">
               <div className="input-group">
                  <label htmlFor="name">Name</label>
                  <input 
                     id="name"
                     type="text" 
                     name="name" 
                     placeholder="Enter your name" 
                     value={formData.name} 
                     onChange={handleChange} 
                     required 
                  />
               </div>
               
               <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input 
                     id="email"
                     type="email" 
                     name="email" 
                     placeholder="Enter your email" 
                     value={formData.email} 
                     onChange={handleChange} 
                     required 
                  />
               </div>
               
               <div className="input-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                     id="message"
                     name="message" 
                     placeholder="Your message here..." 
                     value={formData.message} 
                     onChange={handleChange} 
                     required 
                     rows="5"
                  />
               </div>
               
               <button 
                  type="submit" 
                  className={`submit-btn ${status === "loading" ? 'loading' : ''}`}
                  disabled={status === "loading"}
               >
                  {status === "loading" ? (
                     <>
                        <span className="spinner"></span>
                        Sending...
                     </>
                  ) : (
                     "Send Message"
                  )}
               </button>
            </form>
            
            {status === "success" && (
               <div className="status-message success">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                     <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Message sent successfully!
               </div>
            )}
            
            {status === "error" && (
               <div className="status-message error">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  Something went wrong. Please try again.
               </div>
            )}
         </section>
      </main>
   );
};

export default Contact; 