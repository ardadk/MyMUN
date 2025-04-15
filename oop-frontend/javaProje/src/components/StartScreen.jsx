// src/components/StartScreen.jsx
import React from "react";

// Eğer resmi public klasöründeyse:
const imageSrc = "/images/mun-screen.png";
// Alternatif olarak, eğer resmi src/assets içerisine koyarsanız:
// import imageSrc from "../assets/mun-screen.png";

function StartScreen({ onStart, fadeOut }) {
  const styles = {
    container: {
      height: "100vh",
      backgroundColor: "#000", // Siyah arka plan
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      opacity: fadeOut ? 0 : 1, // fadeOut true ise opaklık 0, değilse 1
      transition: "opacity 0.5s ease", // 500ms yumuşak geçiş
    },
    image: {
      maxWidth: "400px",  // Boyut ayarı (isteğe bağlı)
      width: "100%",
      marginBottom: "20px",
    },
    button: {
      padding: "16px 32px",
      fontSize: "1.2rem",
      cursor: "pointer",
      border: "none",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div style={styles.container}>
      <img src={imageSrc} alt="MUN Start Screen" style={styles.image} />
      <button onClick={onStart} style={styles.button}>
        BAŞLA
      </button>
    </div>
  );
}

export default StartScreen;
