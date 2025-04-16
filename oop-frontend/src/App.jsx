import { useState } from "react";
import './App.css';

// Component imports
import StartScreen from './components/StartScreen';
import PlayerSelection from './components/PlayerSelection';
import CountrySelection from './components/CountrySelection';
import GameSummary from './components/GameSummary';

function App() {
  // Game state
  const [gameStage, setGameStage] = useState("start");
  const [selectedPlayersCount, setSelectedPlayersCount] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerCountries, setPlayerCountries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Event handlers
  const handleStartClick = () => {
    setGameStage("selectPlayers");
  };

  const handlePlayerCountChange = (count) => {
    setSelectedPlayersCount(count);
  };

  const handlePlayerCountSubmit = () => {
    setPlayerCountries(Array(selectedPlayersCount).fill(""));
    setCurrentPlayerIndex(0);
    setGameStage("selectCountries");
  };

  const handleCountryChange = (country) => {
    const newPlayerCountries = [...playerCountries];
    newPlayerCountries[currentPlayerIndex] = country;
    setPlayerCountries(newPlayerCountries);
  };

  const handleNextPlayer = () => {
    if (currentPlayerIndex < selectedPlayersCount - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setGameStage("completed");
    }
  };

  // Backend'e veri gönderme işlemi
  const handleSubmitToBackend = async () => {
    setIsSubmitting(true);
    
    try {
      // Veriyi hazırlama
      const gameData = playerCountries.map((country, index) => ({
        playerNumber: index + 1,
        country: country
      }));
      
      // Backend'e gönderme
      const response = await fetch('http://localhost:8080/api/game/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Backend response:', data);
      
      // Başarılı gönderimden sonra oyunu sıfırla
      handleRestart();
    } catch (error) {
      console.error('Error submitting game data:', error);
      alert('Failed to submit game data to server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setGameStage("start");
    setSelectedPlayersCount(1);
    setCurrentPlayerIndex(0);
    setPlayerCountries([]);
  };

  // Render content based on game stage
  const renderContent = () => {
    switch (gameStage) {
      case "start":
        return <StartScreen onStart={handleStartClick} />;
      
      case "selectPlayers":
        return (
          <PlayerSelection 
            selectedCount={selectedPlayersCount}
            onCountChange={handlePlayerCountChange}
            onContinue={handlePlayerCountSubmit}
          />
        );
      
      case "selectCountries":
        return (
          <CountrySelection 
            playerIndex={currentPlayerIndex}
            selectedCountry={playerCountries[currentPlayerIndex]}
            onCountryChange={handleCountryChange}
            onNext={handleNextPlayer}
            usedCountries={playerCountries.filter(Boolean)} // Seçilmiş ülkeler
          />
        );
      
      case "completed":
        return (
          <GameSummary 
            playerCountries={playerCountries}
            onRestart={handleRestart}
            onSubmit={handleSubmitToBackend}
            isSubmitting={isSubmitting}
          />
        );
      
      default:
        return <div>Something went wrong</div>;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {renderContent()}
      </header>
    </div>
  );
}

export default App;