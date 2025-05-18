import React, { useState } from "react";
import { sendBooking } from "../body/data/data";
import "./style.css";  // обязательно импорт стилей!



const BookingForm = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      carModel: "",
      rentalDate: "",
   });

   const [status, setStatus] = useState(null);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("loading");

      try {
         await sendBooking(formData);
         setStatus("success");
         setFormData({
            name: "",
            email: "",
            phone: "",
            carModel: "",
            rentalDate: "",
         });
      } catch (error) {
         setStatus("error");
      }
   };

   return (
      <main className="MainContent">
         <section className="booking-section">
            <h2>Book Your Rental Car</h2>
            <form className="booking-form" onSubmit={handleSubmit}>
               <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
               />
               <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
               />
               <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
               />
               <input
                  type="text"
                  name="carModel"
                  placeholder="Car Model"
                  value={formData.carModel}
                  onChange={handleChange}
                  required
               />
               <input
                  type="date"
                  name="rentalDate"
                  value={formData.rentalDate}
                  onChange={handleChange}
                  required
               />

               <button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Booking..." : "Book Now"}
               </button>
            </form>

            {status === "success" && <p className="success-message">Booking successful!</p>}
            {status === "error" && <p className="error-message">Something went wrong. Please try again.</p>}
         </section>
      </main>
   );
};

export default BookingForm;
