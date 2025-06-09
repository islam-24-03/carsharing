import React, { useEffect, useState } from "react";
import "./admin.css";

const AdminPanel = () => {
   const [cars, setCars] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const [newCar, setNewCar] = useState({
      title: "",
      year: "",
      price: "",
      imageUrl: "",
   });

   useEffect(() => {
      fetchCars();
   }, []);

   const fetchCars = async () => {
      try {
         const response = await fetch("http://localhost:5000/api/cars");
         const data = await response.json();
         setCars(data);
         setError(null);
      } catch (err) {
         setError("Failed to load cars");
      } finally {
         setLoading(false);
      }
   };

   const toggleBooking = async (car) => {
      try {
         const response = await fetch("http://localhost:5000/api/admin/toggle-booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ carId: car.id }),
         });

         const data = await response.json();

         if (response.ok) {
            setCars((prevCars) =>
               prevCars.map((c) =>
                  c.id === car.id ? { ...c, isBooked: data.isBooked } : c
               )
            );
         } else {
            alert(data.message || "Booking error");
         }
      } catch (error) {
         alert("Failed to update booking: " + error.message);
      }
   };



   const handleNewCarChange = (e) => {
      setNewCar({ ...newCar, [e.target.name]: e.target.value });
   };

   const addCar = async (e) => {
      e.preventDefault();

      if (!newCar.title || !newCar.year || !newCar.price || !newCar.imageUrl) {
         alert("Пожалуйста, заполните все поля");
         return;
      }

      try {
         const response = await fetch("http://localhost:5000/api/add-car", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCar),
         });

         const data = await response.json();

         if (response.ok) {
            setCars((prevCars) => [...prevCars, data.car]);
            setNewCar({ title: "", year: "", price: "", imageUrl: "" });
         } else {
            alert(data.message || "Ошибка добавления машины");
         }
      } catch {
         alert("Ошибка запроса");
      }
   };

   const deleteCar = async (carId) => {
      if (!window.confirm("Вы точно хотите удалить эту машину?")) return;

      try {
         const response = await fetch(
            `http://localhost:5000/api/delete-car/${carId}`,
            {
               method: "DELETE",
            }
         );
         const data = await response.json();

         if (response.ok) {
            setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
         } else {
            alert(data.message || "Ошибка при удалении машины");
         }
      } catch {
         alert("Ошибка запроса");
      }
   };

   return (
      <main className="MainContent admin-panel">
         <h2>Admin Panel</h2>

         {loading ? (
            <p>Loading...</p>
         ) : error ? (
            <p>{error}</p>
         ) : (
            <>
               <table className="admin-table">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Удалить</th>
                     </tr>
                  </thead>
                  <tbody>
                     {cars.map((car) => (
                        <tr key={car.id}>
                           <td>{car.id}</td>
                           <td>{car.title}</td>
                           <td>{car.year}</td>
                           <td>{car.price} сом</td>
                           <td>{car.isBooked ? "Занята" : "Свободна"}</td>
                           <td>
                              <button
                                 className={car.isBooked ? "unbook-btn" : "book-btn"}
                                 onClick={() => toggleBooking(car)}
                              >
                                 {car.isBooked ? "Освободить" : "Забронировать"}
                              </button>
                           </td>
                           <td>
                              <button
                                 className="delete-btn"
                                 onClick={() => deleteCar(car.id)}
                                 style={{ color: "red" }}
                              >
                                 Удалить
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>

               <h3>Добавить новую машину</h3>
               <form className="add-car-form" onSubmit={addCar}>
                  <input
                     type="text"
                     name="title"
                     placeholder="Модель (бренд + название)"
                     value={newCar.title}
                     onChange={handleNewCarChange}
                     required
                  />
                  <input
                     type="number"
                     name="year"
                     placeholder="Год выпуска"
                     value={newCar.year}
                     onChange={handleNewCarChange}
                     required
                  />
                  <input
                     type="number"
                     name="price"
                     placeholder="Цена (сом)"
                     value={newCar.price}
                     onChange={handleNewCarChange}
                     required
                  />
                  <input
                     type="text"
                     name="imageUrl"
                     placeholder="URL изображения"
                     value={newCar.imageUrl}
                     onChange={handleNewCarChange}
                     required
                  />
                  <button type="submit">Добавить машину</button>
               </form>
            </>
         )}
      </main>
   );
};

export default AdminPanel;
