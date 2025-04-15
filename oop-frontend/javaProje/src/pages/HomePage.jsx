// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { fetchGameData } from "../services/api.js";  // dosya adınız apijs.js ise ona göre import edin
import Scoreboard from "../components/Scoreboard";
import Map from "../components/Map";
import PlayerList from "../components/PlayerList";

function HomePage() {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    // API'den veri çek
    fetchGameData().then((data) => {
      setGameData(data);
    });
  }, []);

  if (!gameData) {
    return (
      <div style={styles.loadingContainer}>
        Loading...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Sol Kolon: Scoreboard ve Player List */}
      <div style={styles.leftColumn}>
        <Scoreboard
          economicStatus={gameData.economicStatus}
          welfareLevel={gameData.welfareLevel}
          policy={gameData.policy}
          problem={gameData.problem}
        />
        <PlayerList players={gameData.players} />
      </div>

      {/* Sağ Kolon: Harita */}
      <div style={styles.rightColumn}>
        <Map />
      </div>
    </div>
  );
}

const styles = {
  loadingContainer: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "1.2rem",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
    gap: "20px",
  },
  leftColumn: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  rightColumn: {
    flex: "1.5",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    // Haritanın sol tarafa daha yakın görünmesi için sol margin veya padding azaltılabilir
    marginLeft: "10px",
  },
};

export default HomePage;
