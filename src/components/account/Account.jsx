import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './account.css';

const Account = () => {
   const [bookings, setBookings] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
   const [inputEmail, setInputEmail] = useState('');
   const [loginError, setLoginError] = useState(null);

   useEffect(() => {
      if (userEmail) {
         fetchBookings();
      }
   }, [userEmail]);

   const fetchBookings = () => {
      setLoading(true);
      setError(null);
      axios.get('/api/cars')
         .then(response => {
            const userBookings = response.data.filter(car =>
               car.isBooked && car.bookingInfo?.email === userEmail
            );
            setBookings(userBookings);
         })
         .catch(() => setError('Ошибка при загрузке бронирований'))
         .finally(() => setLoading(false));
   };

   const handleCancelBooking = (carId) => {
      axios.post('/api/unbook', { carId })
         .then(response => {
            if (response.data.success) {
               fetchBookings();
            } else {
               alert(response.data.message || 'Ошибка при отмене брони');
            }
         })
         .catch(() => alert('Ошибка при отмене брони'));
   };

   const handleLogin = (e) => {
      e.preventDefault();
      setLoginError(null);

      if (!inputEmail.trim()) {
         setLoginError('Пожалуйста, введите корректный email');
         return;
      }

      localStorage.setItem('userEmail', inputEmail.trim());
      setUserEmail(inputEmail.trim());
      setInputEmail('');
   };

   if (!userEmail) {
      return (
         <div className="account-container">
            <h1>Вход</h1>
            <form onSubmit={handleLogin} className="account-info">
               <label htmlFor="email">Email:</label>
               <input
                  id="email"
                  type="email"
                  placeholder="Введите email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  required
               />
               {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
               <div className="account-buttons">
                  <button type="submit">Войти</button>
               </div>
            </form>
         </div>
      );
   }

   return (
      <div className="account-container">
         <h1>Мои бронирования</h1>

         {loading && <p>Загрузка...</p>}
         {error && <p style={{ color: 'red' }}>{error}</p>}

         {!loading && bookings.length === 0 && <p>У вас нет активных бронирований.</p>}

         {bookings.map(car => (
            <div key={car.id} className="account-info" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '15px', backgroundColor: '#fff' }}>
               <h2 style={{ marginBottom: '8px' }}>{car.title}</h2>
               <p><strong>Год выпуска:</strong> {car.year}</p>
               <p><strong>Цена:</strong> {car.price}$</p>
               <div className="account-buttons" style={{ justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button
                     onClick={() => handleCancelBooking(car.id)}
                     style={{ backgroundColor: '#e74c3c' }}
                     onMouseOver={e => e.currentTarget.style.backgroundColor = '#c0392b'}
                     onMouseOut={e => e.currentTarget.style.backgroundColor = '#e74c3c'}
                  >
                     Отменить бронь
                  </button>
               </div>
            </div>
         ))}

         <div className="account-buttons" style={{ justifyContent: 'center', marginTop: '20px' }}>
            <button
               onClick={() => {
                  localStorage.removeItem('userEmail');
                  setUserEmail('');
                  setBookings([]);
               }}
               style={{ backgroundColor: '#555' }}
               onMouseOver={e => e.currentTarget.style.backgroundColor = '#333'}
               onMouseOut={e => e.currentTarget.style.backgroundColor = '#555'}
            >
               Выйти
            </button>
         </div>
      </div>
   );
};

export default Account;
