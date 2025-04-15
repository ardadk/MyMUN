// src/components/Header.jsx

import React from "react";

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>LOGO</div>
      <div style={styles.userLabel}>A</div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#b8e994",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    fontWeight: "bold",
    marginLeft: "20px"
  },
  userLabel: {
    fontWeight: "bold",
    marginRight: "20px"
  }
};

export default Header;
