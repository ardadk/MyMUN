import React from 'react';

const GameScreen = ({ playerCountries, currentPlayer, gameData }) => {
  return (
    <div className="game-screen fade-in">
      <div className="game-layout">
        {/* Sol taraf - Harita ve oyuncu bilgileri */}
        <div className="game-left-panel">
          <div className="country-info">
            <div className="country-header">
              <h3>A</h3>
            </div>
          </div>
          
          <div className="player-stats">
            <div className="stat-item">
              <span className="stat-label">EKONOMİK DURUM</span>
              <div className="rating">
                <span>3/5</span>
                <span className="star">★</span>
              </div>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">BİLİM DÜZEYİ</span>
              <div className="rating">
                <span>3/5</span>
                <span className="star">★</span>
              </div>
            </div>
            
            <div className="stat-item wide">
              <span className="stat-label">POLİTİKA</span>
              <div className="policy-info">
                <p>Kapitalist/Emperyalist. Sağa bir yakınlaştır.</p>
              </div>
            </div>
          </div>
          
          <div className="world-map-container">
            <div className="world-map">
              {/* Placeholder for map */}
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                World Map
              </div>
            </div>
          </div>
        </div>
        
        {/* Sağ taraf - Durum bilgileri ve eylemler */}
        <div className="game-right-panel">
          <div className="info-section">
            <div className="info-header">
              <h3>DÜNYA SAĞLIK ÖRGÜTÜ</h3>
            </div>
            <div className="info-content">
              <p>Sağlık organizasyonları desteğini açıklamış bulunmakta.</p>
            </div>
          </div>
          
          <div className="info-section">
            <div className="info-header">
              <h3>DÜNYA BANKASI</h3>
            </div>
            <div className="info-content">
              <p>Mevcut durum raporlarını beklemekte.</p>
            </div>
          </div>
          
          <div className="current-status">
            <h3>GÜNCEL DURUM</h3>
            <div className="country-status">
              {playerCountries.map((country, index) => (
                <div key={index} className="country-item">
                  <span className="country-code">{country}</span>
                </div>
              ))}
            </div>
            <div className="status-info">
              <p>C ülkenin desteğini kaybettiniz.</p>
              <p>10 blokaj sıkıntısı oluşmuştur.</p>
            </div>
          </div>
          
          <div className="action-panel">
            <h3>KONSEY</h3>
            <div className="action-list">
              <p>8 ülkenin başkanlığı</p>
            </div>
            <div className="action-input-area">
              {/* Action input area */}
            </div>
            <div className="action-info">
              <p>Dünya bankasından destek istiyorum.</p>
              <p>Ekonomi geliştireceğim.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;