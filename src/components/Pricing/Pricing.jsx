import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import './Pricing.css';

// Убедитесь, что имя компонента не конфликтует с импортом
const PricingSection = () => {
  const tariffs = [
    {
      name: 'Эконом',
      price: '199₽/час',
      description: 'Бюджетные автомобили для городских поездок',
      features: [
        { name: 'Топливо включено', available: true },
        { name: 'Страховка', available: true },
        { name: 'Пробег не ограничен', available: false },
        { name: 'Премиум поддержка', available: false },
        { name: 'Детское кресло', available: false }
      ],
      popular: false
    },
    {
      name: 'Комфорт',
      price: '399₽/час',
      description: 'Идеальный баланс цены и качества',
      features: [
        { name: 'Топливо включено', available: true },
        { name: 'Страховка', available: true },
        { name: 'Пробег не ограничен', available: true },
        { name: 'Премиум поддержка', available: false },
        { name: 'Детское кресло', available: true }
      ],
      popular: true
    },
    {
      name: 'Бизнес',
      price: '799₽/час',
      description: 'Премиальные автомобили для особых случаев',
      features: [
        { name: 'Топливо включено', available: true },
        { name: 'Страховка', available: true },
        { name: 'Пробег не ограничен', available: true },
        { name: 'Премиум поддержка', available: true },
        { name: 'Детское кресло', available: true }
      ],
      popular: false
    }
  ];

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2>Тарифы каршеринга</h2>
        <p className="subtitle">Выберите оптимальный вариант для ваших потребностей</p>
        
        <div className="tariffs-container">
          {tariffs.map((tariff, index) => (
            <div className={`tariff-card ${tariff.popular ? 'popular' : ''}`} key={index}>
              {tariff.popular && <div className="popular-badge">Популярный</div>}
              <h3>{tariff.name}</h3>
              <div className="price">{tariff.price}</div>
              <p className="description">{tariff.description}</p>
              
              <ul className="features-list">
                {tariff.features.map((feature, i) => (
                  <li key={i}>
                    {feature.available ? <FiCheck className="icon available" /> : <FiX className="icon not-available" />}
                    {feature.name}
                  </li>
                ))}
              </ul>
              
              <button className="select-button">Выбрать тариф</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;