import React, { useEffect, useState } from "react";
import './style.css';

const OurCars = () => {
   const [cars, setCars] = useState([]);
   const [selectedCar, setSelectedCar] = useState(null);

   useEffect(() => {
      const fetchCars = async () => {
         try {
            const response = await fetch("http://localhost:5000/api/cars");
            const data = await response.json();
            setCars(data);
         } catch (error) {
            console.error("Failed to load cars:", error);
         }
      };

      fetchCars();
   }, []);

   return (
      <main className="MainContent" id="our-cars">
         <section className="cars-section container">
            <h2>Our Cars</h2>
            <div className="car-grid">
               {cars.length > 0 ? (
                  cars.map((car, index) => (
                     <div className="car-card" key={index}>
                        <img src={car.image} alt={car.title} className="car-image" />
                        <h3>{car.title}</h3>
                        <p>{car.shortDescription}</p>
                        <button onClick={() => setSelectedCar(car)}>Подробнее</button>
                     </div>
                  ))
               ) : (
                  <p>Loading cars...</p>
               )}
            </div>

            {selectedCar && (
               <div className="modal-overlay" onClick={() => setSelectedCar(null)}>
                  <div className="car-modal" onClick={(e) => e.stopPropagation()}>
                     <button className="close-btn" onClick={() => setSelectedCar(null)}>×</button>
                     <img src={selectedCar.image} alt={selectedCar.title} />
                     <h3>{selectedCar.title}</h3>
                     <p>{selectedCar.description}</p>
                     <ul>
                        <li><strong>Year:</strong> {selectedCar.year}</li>
                        <li><strong>Price per day:</strong> {selectedCar.price} сом</li>
                        <li><strong>Fuel type:</strong> {selectedCar.fuel}</li>
                        <li><strong>Transmission:</strong> {selectedCar.transmission}</li>
                     </ul>
                  </div>
               </div>
            )}
         </section>
      </main>
   );
};

export default OurCars;
