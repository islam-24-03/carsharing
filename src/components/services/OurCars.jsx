import React, { useEffect, useState } from "react";
import './style.css';

const fallbackImage = "https://via.placeholder.com/300?text=No+Image";

const OurCars = () => {
   const [cars, setCars] = useState([]);
   const [selectedCar, setSelectedCar] = useState(null);
   const [pageIndex, setPageIndex] = useState(0);
   const [loading, setLoading] = useState(true);

   const carsPerPage = 8;

   useEffect(() => {
      const fetchCars = async () => {
         try {
            const response = await fetch("http://localhost:5000/api/cars");
            const data = await response.json();
            setCars(data);
         } catch (error) {
            console.error("Failed to load cars:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchCars();
   }, []);

   const maxPages = Math.ceil(cars.length / carsPerPage);
   const paginatedCars = cars.slice(pageIndex * carsPerPage, (pageIndex + 1) * carsPerPage);

   const handleNextPage = () => {
      if (pageIndex + 1 < maxPages) {
         setPageIndex(pageIndex + 1);
      }
   };

   const getImageSrc = (car) => {
      if (car.imageUrl?.startsWith('http')) {
         return car.imageUrl;
      } else if (car.imageUrl) {
         return `http://localhost:5000/${car.imageUrl}`;
      } else {
         return fallbackImage;
      }
   };

   return (
      <main className="MainContent" id="our-cars">
         <section className="cars-section container">
            <h2>Our Cars</h2>
            <div className="car-grid">
               {loading ? (
                  <p>Loading cars...</p>
               ) : paginatedCars.length > 0 ? (
                  paginatedCars.map((car) => {
                     const carLevelClass = car.price > 3500 ? "elite-car" : "standard-car";

                     return (
                        <div className={`car-card ${carLevelClass}`} key={car.id}>
                           <img
                              className="car-image"
                              src={getImageSrc(car)}
                              alt={car.title}
                              onError={(e) => (e.currentTarget.src = fallbackImage)}
                           />
                           <h3>{car.title}</h3>
                           <p>{car.shortDescription}</p>
                           <button onClick={() => setSelectedCar(car)}>Подробнее</button>
                        </div>
                     );
                  })
               ) : (
                  <p>No cars available.</p>
               )}
            </div>

            <div className="pagination-controls">
               <button
                  onClick={handleNextPage}
                  disabled={pageIndex + 1 >= maxPages}
                  title={pageIndex + 1 >= maxPages ? "Больше машин нет" : "Показать еще"}
               >
                  Показать еще
               </button>
            </div>

            {selectedCar && (
               <div className="modal-overlay" onClick={() => setSelectedCar(null)}>
                  <div className="car-modal" onClick={(e) => e.stopPropagation()}>
                     <button className="close-btn" onClick={() => setSelectedCar(null)}>×</button>
                     <img
                        className="car-image"
                        src={getImageSrc(selectedCar)}
                        alt={selectedCar.title}
                        onError={(e) => (e.currentTarget.src = fallbackImage)}
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
