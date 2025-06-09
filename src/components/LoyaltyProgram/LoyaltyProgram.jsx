import React, { useState, useEffect } from 'react';
import { FaStar, FaGift, FaCoins, FaPercentage, FaCheck } from 'react-icons/fa';
import './LoyaltyProgram.css';

const LoyaltyProgram = () => {
  const [userPoints, setUserPoints] = useState(() => {
    return parseInt(localStorage.getItem('userPoints')) || 1250;
  });
  const [activeTab, setActiveTab] = useState('levels');
  const [transactionHistory, setTransactionHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('transactionHistory')) || [];
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log('LoyaltyProgram mounted', { userPoints, activeTab, transactionHistory });
  }, []);

  const loyaltyLevels = [
    {
      name: 'Standard',
      points: 0,
      discount: 0,
      benefits: ['Basic terms'],
      icon: <FaStar color="#ccc" />,
    },
    {
      name: 'Bronze',
      points: 500,
      discount: 5,
      benefits: ['5% discount', 'Priority support'],
      icon: <FaStar color="#cd7f32" />,
    },
    {
      name: 'Silver',
      points: 1000,
      discount: 10,
      benefits: ['10% discount', 'Free child seat', 'Faster booking'],
      icon: <FaStar color="#c0c0c0" />,
    },
    {
      name: 'Gold',
      points: 2000,
      discount: 15,
      benefits: ['15% discount', 'Free car upgrade', 'Personal manager'],
      icon: <FaStar color="#ffd700" />,
    },
  ];

  const rewards = [
    { id: 1, name: '1 hour rental', cost: 500, icon: <FaGift /> },
    { id: 2, name: 'Child seat', cost: 200, icon: <FaGift /> },
    { id: 3, name: 'Car wash', cost: 300, icon: <FaGift /> },
  ];

  const currentLevel = loyaltyLevels.reduce((acc, level) =>
    userPoints >= level.points ? level : acc, loyaltyLevels[0]);

  const nextLevel = loyaltyLevels.find(level => level.points > currentLevel.points);

  useEffect(() => {
    localStorage.setItem('userPoints', userPoints);
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
  }, [userPoints, transactionHistory]);

  const handleRedeemReward = (reward) => {
    if (userPoints >= reward.cost) {
      setUserPoints(prev => prev - reward.cost);
      const newTransaction = {
        id: Date.now(),
        type: 'redeem',
        description: `Redeemed "${reward.name}" (-${reward.cost} points)`,
        date: new Date().toLocaleString(),
      };
      setTransactionHistory(prev => [newTransaction, ...prev]);
      setNotification(`Successfully redeemed: ${reward.name}!`);
    } else {
      setNotification('Not enough points.');
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddPoints = (points) => {
    setUserPoints(prev => prev + points);
    const newTransaction = {
      id: Date.now(),
      type: 'add',
      description: `Added ${points} points`,
      date: new Date().toLocaleString(),
    };
    setTransactionHistory(prev => [newTransaction, ...prev]);
    setNotification(`Added ${points} points!`);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const newLevel = loyaltyLevels.find(
      level => userPoints >= level.points && level.name !== currentLevel.name
    );
    if (newLevel) {
      setNotification(`Congratulations! Reached "${newLevel.name}" level!`);
      setTimeout(() => setNotification(null), 3000);
    }
  }, [userPoints, currentLevel.name]);

  return (
    <section className="loyalty-program" id="loyalty">
      <div className="container">
        <h2>Loyalty Program</h2>
        <p className="subtitle">Earn points and get privileges</p>

        {notification && <div className="notification">{notification}</div>}

        <div className="points-balance">
          <div className="points-display">
            <FaCoins className="points-icon" />
            <span className="points-value">{userPoints}</span>
            <span className="points-label">points</span>
          </div>
          <button className="add-points-btn" onClick={() => handleAddPoints(100)}>
            Add 100 points (test)
          </button>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: nextLevel
                  ? `${Math.min(100, ((userPoints - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100)}%`
                  : '100%',
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
          {['levels', 'rewards', 'history'].map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className={`tab-content ${activeTab}`}>
          {activeTab === 'levels' && (
            <div className="levels-container">
              <h3>Your current privileges:</h3>
              <ul className="benefits-list">
                {currentLevel.benefits.map((benefit, index) => (
                  <li key={index}>
                    <FaCheck className="benefit-icon" /> {benefit}
                  </li>
                ))}
              </ul>

              {nextLevel && (
                <div className="next-level-info">
                  <h4>To {nextLevel.name}: {nextLevel.points - userPoints} points</h4>
                  <p>Next privileges:</p>
                  <ul>
                    {nextLevel.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="all-levels">
                <h3>All program levels</h3>
                <div className="levels-grid">
                  {loyaltyLevels.map((level, index) => (
                    <div
                      key={index}
                      className={`level-card ${userPoints >= level.points ? 'unlocked' : ''}`}
                    >
                      <div className="level-icon">{level.icon}</div>
                      <h4>{level.name}</h4>
                      <p>From {level.points} points</p>
                      {level.discount > 0 && (
                        <div className="discount-badge">
                          <FaPercentage /> {level.discount}% discount
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="rewards-container">
              <h3>Redeem points for rewards</h3>
              <div className="rewards-grid">
                {rewards.map(reward => (
                  <div key={reward.id} className="reward-card">
                    <div className="reward-icon">{reward.icon}</div>
                    <h4>{reward.name}</h4>
                    <div className="reward-cost">
                      <FaCoins /> {reward.cost} points
                    </div>
                    <button
                      className="redeem-btn"
                      disabled={userPoints < reward.cost}
                      onClick={() => handleRedeemReward(reward)}
                    >
                      Redeem
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-container">
              <h3>Transaction History</h3>
              {transactionHistory.length > 0 ? (
                <ul className="history-list">
                  {transactionHistory.map(transaction => (
                    <li key={transaction.id}>
                      <span>{transaction.date}</span> - {transaction.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No transactions yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoyaltyProgram;
