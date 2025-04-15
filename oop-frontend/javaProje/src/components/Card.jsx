// src/components/Card.jsx

import React from "react";

function Card({ title, children }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#f5f5f5",
    padding: "16px",
    borderRadius: "8px",
    margin: "8px",
    width: "200px"
  },
  title: {
    margin: 0,
    marginBottom: "8px"
  },
  content: {
    fontSize: "1rem"
  }
};

export default Card;
