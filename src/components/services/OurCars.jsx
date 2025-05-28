import React, { useEffect, useState } from "react";
import './style.css';

const fallbackImage = "https://via.placeholder.com/300?text=No+Image";

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
                  cars.map((car, index) => {
                     const imageSrc = car.image?.startsWith('http')
                        ? car.image
                        : car.image
                           ? `http://localhost:5000${car.image}`
                           : fallbackImage;

                     return (
                        <div className="car-card" key={index}>
                           <img
                              className="car-image"
                              src={imageSrc}
                              alt={car.title}
                           />
                           <h3>{car.title}</h3>
                           <p>{car.shortDescription}</p>
                           <button onClick={() => setSelectedCar(car)}>Подробнее</button>
                        </div>
                     );
                  })
               ) : (
                  <p>Loading cars...</p>
               )}
            </div>

            {selectedCar && (
               <div className="modal-overlay" onClick={() => setSelectedCar(null)}>
                  <div className="car-modal" onClick={(e) => e.stopPropagation()}>
                     <button className="close-btn" onClick={() => setSelectedCar(null)}>×</button>
                     <img
                        className="car-image"
                        src={
                           selectedCar.image?.startsWith('http')
                              ? selectedCar.image
                              : selectedCar.image
                                 ? `http://localhost:5000${selectedCar.image}`
                                 : fallbackImage
                        }
                        alt={selectedCar.title}
                     />
                     <h3>{selectedCar.title}</h3>
                     <p>{selectedCar.description}</p>
                     <p><strong>Status:</strong> {selectedCar.isBooked ? "Занята" : "Свободна"}</p>
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
