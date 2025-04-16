import React, { useState } from "react";
import './App.css';

function App() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState(1);

  const countries = ["A", "B", "C", "D", "E"];
  const players = [1, 2, 3, 4, 5];

  const handleStartClick = () => {
    setShowOptions(true);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handlePlayerChange = (event) => {
    setSelectedPlayers(parseInt(event.target.value));
  };

  return (
    <div className="App">
      <header className="App-header">
        {!showOptions ? (
          <button
            onClick={handleStartClick}
            style={{ fontSize: "20px", padding: "10px 20px", cursor: "pointer" }}
          >
            Start
          </button>
        ) : (
          <div>
            <h2>Select a Country</h2>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              style={{ fontSize: "18px", padding: "8px", margin: "10px" }}
            >
              <option value="" disabled>
                Choose a country
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <h2>Select Number of Players</h2>
            <select
              value={selectedPlayers}
              onChange={handlePlayerChange}
              style={{ fontSize: "18px", padding: "8px", margin: "10px" }}
            >
              {players.map((player) => (
                <option key={player} value={player}>
                  {player}
                </option>
              ))}
            </select>

            <div style={{ marginTop: "20px" }}>
              <p>
                Selected Country: <strong>{selectedCountry || "None"}</strong>
              </p>
              <p>
                Selected Players: <strong>{selectedPlayers}</strong>
              </p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;