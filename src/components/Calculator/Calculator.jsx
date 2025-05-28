import React, { useState } from 'react';
import { FiClock, FiCalendar } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa'; // Используем иконку из FontAwesome
import './Calculator.css';

const Calculator = () => {
  const [selectedCar, setSelectedCar] = useState('');
  const [hours, setHours] = useState(1);
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);

  const cars = [
    { id: 1, model: 'Toyota Corolla (Эконом)', price: 199 },
    { id: 2, model: 'Volkswagen Golf (Комфорт)', price: 399 },
    { id: 3, model: 'BMW 5 Series (Бизнес)', price: 799 }
  ];

  const calculateTotal = () => {
    const selectedCarData = cars.find(car => car.model === selectedCar);
    if (!selectedCarData) return 0;
    
    const hourlyRate = selectedCarData.price;
    const dailyRate = hourlyRate * 10;
    return (hours * hourlyRate) + (days * dailyRate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTotal(calculateTotal());
  };

  return (
    <section className="calculator" id="calculator">
      <div className="container">
        <h2>Калькулятор аренды</h2>
        <p className="subtitle">Рассчитайте стоимость аренды автомобиля</p>

        <form onSubmit={handleSubmit} className="calculator-form">
          <div className="form-group">
            <label>
              <FaCar className="icon" /> Выберите автомобиль:
            </label>
            <select 
              value={selectedCar} 
              onChange={(e) => setSelectedCar(e.target.value)}
              required
            >
              <option value="">-- Выберите модель --</option>
              {cars.map(car => (
                <option key={car.id} value={car.model}>
                  {car.model} - {car.price}₽/час
                </option>
              ))}
            </select>
          </div>

          <div className="time-inputs">
            <div className="form-group">
              <label>
                <FiClock className="icon" /> Часы:
              </label>
              <input
                type="number"
                min="1"
                max="24"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="form-group">
              <label>
                <FiCalendar className="icon" /> Сутки:
              </label>
              <input
                type="number"
                min="0"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <button type="submit" className="calculate-btn">
            Рассчитать стоимость
          </button>

          {total > 0 && (
            <div className="result">
              <h3>Итоговая стоимость:</h3>
              <div className="total-price">{total}₽</div>
              <p className="note">*Окончательная цена может отличаться</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Calculator;