import React, { useState } from 'react';
import { FaStar, FaGift, FaCoins, FaPercentage, FaCheck } from 'react-icons/fa';
import './LoyaltyProgram.css';

const LoyaltyProgram = () => {
  const [userPoints, setUserPoints] = useState(1250); // Пример начальных баллов
  const [activeTab, setActiveTab] = useState('levels');

  const loyaltyLevels = [
    {
      name: 'Стандарт',
      points: 0,
      discount: 0,
      benefits: ['Базовые условия'],
      icon: <FaStar color="#ccc" />
    },
    {
      name: 'Бронза',
      points: 500,
      discount: 5,
      benefits: ['5% скидка', 'Приоритетная поддержка'],
      icon: <FaStar color="#cd7f32" />
    },
    {
      name: 'Серебро',
      points: 1000,
      discount: 10,
      benefits: ['10% скидка', 'Бесплатное детское кресло', 'Ускоренное бронирование'],
      icon: <FaStar color="#c0c0c0" />
    },
    {
      name: 'Золото',
      points: 2000,
      discount: 15,
      benefits: ['15% скидка', 'Бесплатный апгрейд авто', 'Персональный менеджер'],
      icon: <FaStar color="#ffd700" />
    }
  ];

  const rewards = [
    {
      id: 1,
      name: '1 час аренды',
      cost: 500,
      icon: <FaGift />
    },
    {
      id: 2,
      name: 'Детское кресло',
      cost: 200,
      icon: <FaGift />
    },
    {
      id: 3,
      name: 'Мойка авто',
      cost: 300,
      icon: <FaGift />
    }
  ];

  const currentLevel = loyaltyLevels.reduce((acc, level) => 
    userPoints >= level.points ? level : acc, loyaltyLevels[0]);

  const nextLevel = loyaltyLevels.find(level => level.points > currentLevel.points);

  return (
    <section className="loyalty-program" id="loyalty">
      <div className="container">
        <h2>Программа лояльности</h2>
        <p className="subtitle">Зарабатывайте баллы и получайте привилегии</p>

        <div className="points-balance">
          <div className="points-display">
            <FaCoins className="points-icon" />
            <span className="points-value">{userPoints}</span>
            <span className="points-label">баллов</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ 
                width: nextLevel 
                  ? `${Math.min(100, (userPoints - currentLevel.points) / (nextLevel.points - currentLevel.points) * 100)}%` 
                  : '100%'
              }}
            ></div>
            <div className="level-marker">
              {currentLevel.icon}
              <span>{currentLevel.name}</span>
            </div>
            {nextLevel && (
              <div className="next-level-marker">
                {nextLevel.icon}
                <span>{nextLevel.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'levels' ? 'active' : ''}`}
            onClick={() => setActiveTab('levels')}
          >
            Уровни
          </button>
          <button 
            className={`tab ${activeTab === 'rewards' ? 'active' : ''}`}
            onClick={() => setActiveTab('rewards')}
          >
            Награды
          </button>
        </div>

        {activeTab === 'levels' ? (
          <div className="levels-container">
            <h3>Ваши текущие привилегии:</h3>
            <ul className="benefits-list">
              {currentLevel.benefits.map((benefit, index) => (
                <li key={index}>
                  <FaCheck className="benefit-icon" /> {benefit}
                </li>
              ))}
            </ul>

            {nextLevel && (
              <div className="next-level-info">
                <h4>До {nextLevel.name}: {nextLevel.points - userPoints} баллов</h4>
                <p>Следующие привилегии:</p>
                <ul>
                  {nextLevel.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="all-levels">
              <h3>Все уровни программы</h3>
              <div className="levels-grid">
                {loyaltyLevels.map((level, index) => (
                  <div 
                    key={index} 
                    className={`level-card ${userPoints >= level.points ? 'unlocked' : ''}`}
                  >
                    <div className="level-icon">{level.icon}</div>
                    <h4>{level.name}</h4>
                    <p>От {level.points} баллов</p>
                    {level.discount > 0 && (
                      <div className="discount-badge">
                        <FaPercentage /> {level.discount}% скидка
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="rewards-container">
            <h3>Обменяйте баллы на награды</h3>
            <div className="rewards-grid">
              {rewards.map(reward => (
                <div key={reward.id} className="reward-card">
                  <div className="reward-icon">{reward.icon}</div>
                  <h4>{reward.name}</h4>
                  <div className="reward-cost">
                    <FaCoins /> {reward.cost} баллов
                  </div>
                  <button 
                    className="redeem-btn"
                    disabled={userPoints < reward.cost}
                  >
                    Обменять
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoyaltyProgram;