import React, { useState } from 'react';
import { FiClock, FiCalendar } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import './Calculator.css';

const Calculator = () => {
  const [selectedCar, setSelectedCar] = useState('');
  const [hours, setHours] = useState(1);
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);

  const cars = [
    { id: 1, model: 'Toyota Corolla (Economy)', price: 199 },
    { id: 2, model: 'Volkswagen Golf (Comfort)', price: 399 },
    { id: 3, model: 'BMW 5 Series (Business)', price: 799 }
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
        <h2>Rental Calculator</h2>
        <p className="subtitle">Calculate your car rental cost</p>

        <form onSubmit={handleSubmit} className="calculator-form">
          <div className="form-group">
            <label>
              <FaCar className="icon" /> Select a car:
            </label>
            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              required
            >
              <option value="">-- Choose a model --</option>
              {cars.map(car => (
                <option key={car.id} value={car.model}>
                  {car.model} - {car.price}₽/hour
                </option>
              ))}
            </select>
          </div>

          <div className="time-inputs">
            <div className="form-group">
              <label>
                <FiClock className="icon" /> Hours:
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
                <FiCalendar className="icon" /> Days:
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
            Calculate Cost
          </button>

          {total > 0 && (
            <div className="result">
              <h3>Total Cost:</h3>
              <div className="total-price">{total}₽</div>
              <p className="note">*Final price may vary</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Calculator;
