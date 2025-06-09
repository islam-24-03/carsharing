import React, { useState, useEffect } from "react";
import sendBooking from './data/data.js';

const BookingForm = () => {
   const [formData, setFormData] = useState(() => {
      const savedData = localStorage.getItem('bookingFormData');
      return savedData ? JSON.parse(savedData) : {
         name: '',
         email: '',
         phone: '',
         carModel: '',
         rentalDate: '',
      };
   });

   const [status, setStatus] = useState(null);
   const [errors, setErrors] = useState({});

   const carModels = [
      { value: '', label: 'Select a car model' },
      { value: 'economy', label: 'Economy (Hyundai Solaris)' },
      { value: 'comfort', label: 'Comfort (Kia Optima)' },
      { value: 'business', label: 'Business (BMW 5 Series)' },
   ];

   useEffect(() => {
      localStorage.setItem('bookingFormData', JSON.stringify(formData));
   }, [formData]);

   const validateForm = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!/^\+996\d{9}$/.test(formData.phone)) newErrors.phone = 'Phone must start with +996 and contain 9 digits';
      if (!formData.carModel) newErrors.carModel = 'Select a car model';
      if (!formData.rentalDate || new Date(formData.rentalDate) < new Date().setHours(0, 0, 0, 0)) {
         newErrors.rentalDate = 'Select a valid future date';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: '' });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      setStatus('loading');
      try {
         await sendBooking(formData);
         setStatus('success');
         setFormData({
            name: '',
            email: '',
            phone: '',
            carModel: '',
            rentalDate: '',
         });
         localStorage.removeItem('bookingFormData');
      } catch (error) {
         setStatus('error');
      } finally {
         setTimeout(() => setStatus(null), 3000);
      }
   };

   const handleReset = () => {
      setFormData({
         name: '',
         email: '',
         phone: '',
         carModel: '',
         rentalDate: '',
      });
      setErrors({});
      localStorage.removeItem('bookingFormData');
   };

   return (
      <main className="MainContent" id="booking">
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
               {errors.name && <p className="error-message">{errors.name}</p>}

               <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
               />
               {errors.email && <p className="error-message">{errors.email}</p>}

               <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
               />
               {errors.phone && <p className="error-message">{errors.phone}</p>}

               <select
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  required
               >
                  {carModels.map(model => (
                     <option key={model.value} value={model.value}>
                        {model.label}
                     </option>
                  ))}
               </select>
               {errors.carModel && <p className="error-message">{errors.carModel}</p>}

               <input
                  type="date"
                  name="rentalDate"
                  value={formData.rentalDate}
                  onChange={handleChange}
                  required
               />
               {errors.rentalDate && <p className="error-message">{errors.rentalDate}</p>}

               <div className="form-actions">
                  <button type="submit" disabled={status === "loading"}>
                     {status === "loading" ? "Booking..." : "Book Now"}
                  </button>
                  <button type="button" onClick={handleReset}>
                     Reset
                  </button>
               </div>
            </form>

            {status === "success" && <p className="success-message">Booking successful!</p>}
            {status === "error" && <p className="error-message">Something went wrong. Please try again.</p>}
         </section>
      </main>
   );
};

export default BookingForm;