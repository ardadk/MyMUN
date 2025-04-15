// src/App.jsx
import React, { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

function App() {
  const [started, setStarted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const handleStart = () => {
    setStarted(true);
  };

  // started değiştiğinde, geçiş süresi (örneğin 500ms) kadar bekleyip splash ekranı kaldırıyoruz.
  useEffect(() => {
    if (started) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 500); // 500ms geçiş süresi
      return () => clearTimeout(timer);
    }
  }, [started]);

  return (
    <>
      {showSplash && <StartScreen onStart={handleStart} fadeOut={started} />}
      {!showSplash && (
        <>
          <Header />
          <HomePage />
        </>
      )}
    </>
  );
}

export default App;
