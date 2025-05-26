import React, { useEffect, useState } from "react";

const Services = () => {
   const [services, setServices] = useState([]);

   useEffect(() => {
      const fetchServices = async () => {
         try {
            const response = await fetch("https://your-backend-url.com/api/services");
            const data = await response.json();
            setServices(data);
         } catch (error) {
            console.error("Failed to load services:", error);
         }
      };

      fetchServices();
   }, []);

   return (
      <main className="MainContent" id="services">
         <section className="services-section">
            <h2>Our Services</h2>
            <ul>
               {services.length > 0 ? (
                  services.map((service, index) => (
                     <li key={index}>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                     </li>
                  ))
               ) : (
                  <p>Loading services...</p>
               )}
            </ul>
         </section>
      </main>
   );
};

export default Services;
