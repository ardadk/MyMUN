// src/components/PlayerList.jsx

import React from "react";

function PlayerList({ players }) {
  return (
    <div style={styles.playerListContainer}>
      <h2>Güncel Puan Durumu</h2>
      <ul style={styles.ulStyle}>
        {players.map((player, index) => (
          <li key={index} style={styles.liStyle}>
            <span>{player.name}</span>
            <span style={{ marginLeft: "10px" }}>Puan: {player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  playerListContainer: {
    margin: "16px",
    padding: "16px",
    backgroundColor: "#fafafa",
    borderRadius: "8px",
    width: "200px"
  },
  ulStyle: {
    listStyleType: "none",
    paddingLeft: 0,
    margin: 0
  },
  liStyle: {
    padding: "4px 0"
  }
};

export default PlayerList;
