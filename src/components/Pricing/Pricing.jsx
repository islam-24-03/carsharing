import React, { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Pricing.css';

const PricingSection = () => {
  const [currency, setCurrency] = useState('RUB');
  const [selectedTariff, setSelectedTariff] = useState(null);

  const exchangeRate = 0.013;

  const tariffs = [
    {
      name: 'Economy',
      priceRUB: 199,
      description: 'Budget cars for city trips',
      features: [
        { name: 'Fuel included', available: true },
        { name: 'Insurance', available: true },
        { name: 'Unlimited mileage', available: false },
        { name: 'Premium support', available: false },
        { name: 'Child seat', available: false },
      ],
      popular: false,
    },
    {
      name: 'Comfort',
      priceRUB: 399,
      description: 'Perfect balance of price and quality',
      features: [
        { name: 'Fuel included', available: true },
        { name: 'Insurance', available: true },
        { name: 'Unlimited mileage', available: true },
        { name: 'Premium support', available: false },
        { name: 'Child seat', available: true },
      ],
      popular: true,
    },
    {
      name: 'Business',
      priceRUB: 799,
      description: 'Premium cars for special occasions',
      features: [
        { name: 'Fuel included', available: true },
        { name: 'Insurance', available: true },
        { name: 'Unlimited mileage', available: true },
        { name: 'Premium support', available: true },
        { name: 'Child seat', available: true },
      ],
      popular: false,
    },
  ];

  const handleSelectTariff = (tariffName) => {
    setSelectedTariff(tariffName);
    alert(`You selected the tariff: ${tariffName}`);
  };

  const formatPrice = (priceRUB) => {
    if (currency === 'RUB') {
      return `₽${priceRUB}`;
    } else {
      const priceUSD = (priceRUB * exchangeRate).toFixed(2);
      return `$${priceUSD}`;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2>Carsharing Tariffs</h2>
        <p className="subtitle">Choose the best option for your needs</p>

        <div className="currency-toggle">
          <button
            className={currency === 'RUB' ? 'active' : ''}
            onClick={() => setCurrency('RUB')}
          >
            ₽ RUB
          </button>
          <button
            className={currency === 'USD' ? 'active' : ''}
            onClick={() => setCurrency('USD')}
          >
            $ USD
          </button>
        </div>

        <motion.div
          className="tariffs-container"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <AnimatePresence>
            {tariffs.map((tariff, index) => (
              <motion.div
                className={`tariff-card ${tariff.popular ? 'popular' : ''} ${selectedTariff === tariff.name ? 'selected' : ''
                  }`}
                key={index}
                variants={cardVariants}
              >
                {tariff.popular && <div className="popular-badge">Popular</div>}
                <h3>{tariff.name}</h3>
                <div className="price">{formatPrice(tariff.priceRUB)}</div>
                <p className="description">{tariff.description}</p>

                <ul className="features-list">
                  {tariff.features.map((feature, i) => (
                    <li key={i}>
                      {feature.available ? (
                        <FiCheck className="icon available" />
                      ) : (
                        <FiX className="icon not-available" />
                      )}
                      {feature.name}
                    </li>
                  ))}
                </ul>

                <button
                  className="select-button"
                  onClick={() => handleSelectTariff(tariff.name)}
                >
                  {selectedTariff === tariff.name ? 'Selected' : 'Select Tariff'}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
