// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StartScreen      from './components/StartScreen';
import PlayerSelection  from './components/PlayerSelection';
import CountrySelection from './components/CountrySelection';
import GameSummary      from './components/GameSummary';

import GameScreenLayout from './components/GameScreenLayout';
import LeftPanel        from './components/LeftPanel';
import RightPanel       from './components/RightPanel/RightPanel';
import CountryPage      from './components/CountryPage/CountryPage';

// Frontend'deki veri dosyalarını kaldırabilirsiniz, artık backend'den gelecek
// import policies   from './data/policies';
// import problems   from './data/problems';
// import chatOptions from './data/chatOptions';

const countryCodes = ["A","B","C","D","E"];

export default function App(){
  // --- seçim akışı state'leri ---
  const [gameStage, setGameStage] = useState("start");
  const [selectedPlayersCount, setSelectedPlayersCount] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerCountries, setPlayerCountries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- oynama akışı state'leri ---
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [countryPolicies, setCountryPolicies] = useState({});
  const [econScores, setEconScores] = useState({});
  const [welfareScores, setWelfareScores] = useState({});
  const [globalProblem, setGlobalProblem] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [messageSteps, setMessageSteps] = useState({});
  const [isScoringPhase, setIsScoringPhase] = useState(false);
  const [scoreTurnIndex, setScoreTurnIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [voteCounts, setVoteCounts] = useState({});
  const [chatOptionsMap, setChatOptionsMap] = useState({});
  // --- hangi ülke detaya bakıyor ---
  const [viewCountry, setViewCountry] = useState(null);

  // --- seçim akışı handler'ları ---
  const handleStartClick = () => setGameStage("selectPlayers");
  const handlePlayerCountChange = cnt => setSelectedPlayersCount(cnt);
  const handlePlayerCountSubmit = () => {
    setPlayerCountries(Array(selectedPlayersCount).fill(""));
    setCurrentPlayerIndex(0);
    setGameStage("selectCountries");
  };
  const handleCountryChange = country => {
    const copy = [...playerCountries];
    copy[currentPlayerIndex] = country;
    setPlayerCountries(copy);
  };
  const handleNextPlayer = () => {
    if (currentPlayerIndex < selectedPlayersCount-1)
      setCurrentPlayerIndex(i=>i+1);
    else
      setGameStage("completed");
  };
  const handleSubmitToBackend = async () => {
    setIsSubmitting(true);
    try {
      // Prepares player data with IDs and country names
      const playerData = playerCountries.map((country, index) => ({
        playerId: `${index + 1}`, // Numeric ID without "player" prefix
        countryName: country
      }));
      
      console.log("Backend'e gönderilecek veriler:", playerData);
      
      // Sends POST request to backend
      const response = await axios.post('http://localhost:8080/api/game/start', {
        players: playerData
      }, {
        timeout: 5000
      });
      
      // Processes response from backend
      const gameData = response.data.gameData;
      // ... state updates with response data ...
      
      setGameStage("playing");
    } catch (error) {
      console.error("Oyun başlatma hatası:", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleRestart = () => {
    // tüm state'leri sıfırla
    setGameStage("start");
    setSelectedPlayersCount(1);
    setCurrentPlayerIndex(0);
    setPlayerCountries([]);
    setIsSubmitting(false);

    setCurrentCountryIndex(0);
    setCountryPolicies({});
    setEconScores({});
    setWelfareScores({});
    setGlobalProblem("");
    setChatMessages([]);
    setMessageSteps({});
    setChatOptionsMap({});
    setIsScoringPhase(false);
    setScoreTurnIndex(0);
    setScores({});
    setVoteCounts({});
    setViewCountry(null);
  };

  // --- oynama akışı handler'ları ---
  const handleOptionSelect = async (opt) => {
    const cc = playerCountries[currentCountryIndex];
    setChatMessages(m => [...m,{country:cc,text:opt.text}]);
    
    // Seçilen seçeneğin next değerine göre messageSteps'i güncelle
    const nextStep = opt.next || "start";
    setMessageSteps(ms => ({ ...ms, [cc]: nextStep }));
    
    // Yeni seçenekleri backend'den al
    try {
      const response = await axios.get(`http://localhost:8080/api/game/options/${nextStep}`);
      setChatOptionsMap(prev => ({ ...prev, [nextStep]: response.data }));
    } catch (error) {
      console.error("Chat seçenekleri alınamadı:", error);
    }
    
    const nextIdx = (currentCountryIndex+1) % playerCountries.length;
    setCurrentCountryIndex(nextIdx);
    if(nextIdx===0) setIsScoringPhase(true);
  };

  const handleVoteSubmit = votes => {
    const voter = playerCountries[scoreTurnIndex];
    const newScores = {...scores}, newCounts={...voteCounts};
    Object.entries(votes).forEach(([t,p])=>{
      newScores[t]+=p;
      newCounts[t]+=1;
    });
    setScores(newScores);
    setVoteCounts(newCounts);

    if(scoreTurnIndex < playerCountries.length-1){
      setScoreTurnIndex(i=>i+1);
    } else {
      setIsScoringPhase(false);
      setScoreTurnIndex(0);
      setCurrentCountryIndex(0);
    }
  };

  // --- render
  switch(gameStage){
    case "start":
      return <StartScreen onStart={handleStartClick}/>;

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
          usedCountries={playerCountries.filter(Boolean)}
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

    case "playing":
      // **eğer detay sayfa** isteniyorsa tam genişlik
      if(viewCountry){
        return (
          <CountryPage
            countryCode={viewCountry}
            econ={econScores[viewCountry]}
            welfare={welfareScores[viewCountry]}
            policy={countryPolicies[viewCountry]}
            problem={globalProblem}
            totalScores={scores}
            voteCounts={voteCounts}
            onBack={()=> setViewCountry(null)}
          />
        );
      }

      // Şu anki ülkenin adımı için seçenekleri al
      const currentCountry = playerCountries[currentCountryIndex];
      const currentStep = messageSteps[currentCountry] || "start";
      const currentOptions = chatOptionsMap[currentStep] || [];

      // yok, normal iki panelli sohbet/oylama
      const left = (
        <LeftPanel
          playerCountries={playerCountries}
          onCountrySelect={c => setViewCountry(c)}
        />
      );
      const right = (
        <RightPanel
          problem={globalProblem}
          currentCountry={currentCountry}
          options={currentOptions}
          onSelectOption={handleOptionSelect}
          isScoringPhase={isScoringPhase}
          voter={playerCountries[scoreTurnIndex]}
          onVote={handleVoteSubmit}
          totalScores={scores}
          voteCounts={voteCounts}
        />
      );

      return <GameScreenLayout left={left} right={right}/>;

    default:
      return <div>Bir şeyler ters gitti…</div>;
  }
}
