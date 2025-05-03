// src/App.js
import React, { useState } from 'react';
import StartScreen      from './components/StartScreen';
import PlayerSelection  from './components/PlayerSelection';
import CountrySelection from './components/CountrySelection';
import GameSummary      from './components/GameSummary';

import GameScreenLayout from './components/GameScreenLayout';
import LeftPanel        from './components/LeftPanel';
import RightPanel       from './components/RightPanel/RightPanel';
import CountryPage      from './components/CountryPage/CountryPage';

import policies   from './data/policies';
import problems   from './data/problems';
import chatOptions from './data/chatOptions';

const countryCodes = ["A","B","C","D","E"];
function getRandomScore(){ return Math.floor(Math.random()*5)+1; }
function getRandomPolicy(list){
  const keys = Object.keys(list);
  return list[keys[Math.floor(Math.random()*keys.length)]];
}

export default function App(){
  // --- seçim akışı state’leri ---
  const [gameStage, setGameStage] = useState("start");
  const [selectedPlayersCount, setSelectedPlayersCount] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerCountries, setPlayerCountries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- oynama akışı state’leri ---
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
  // --- hangi ülke detaya bakıyor ---
  const [viewCountry, setViewCountry] = useState(null);

  // --- seçim akışı handler’ları ---
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
      initLocalGame();
      setGameStage("playing");
      setViewCountry(null);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleRestart = () => {
    // tüm state’leri sıfırla
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
    setIsScoringPhase(false);
    setScoreTurnIndex(0);
    setScores({});
    setVoteCounts({});
    setViewCountry(null);
  };

  // --- oynama verilerini hazırla ---
  function initLocalGame(){
    const pols={}, econ={}, welfare={};
    playerCountries.forEach(c => {
      pols[c]    = getRandomPolicy(policies);
      econ[c]    = getRandomScore();
      welfare[c] = getRandomScore();
    });
    setCountryPolicies(pols);
    setEconScores(econ);
    setWelfareScores(welfare);

    const allProblems = Object.values(problems);
    setGlobalProblem(
      allProblems[Math.floor(Math.random()*allProblems.length)]
    );

    setChatMessages([]);
    setMessageSteps(
      playerCountries.reduce((a,c)=>( {...a,[c]:"start"} ),{})
    );
    setScores(
      playerCountries.reduce((a,c)=>( {...a,[c]:0} ),{})
    );
    setVoteCounts(
      playerCountries.reduce((a,c)=>( {...a,[c]:0} ),{})
    );
    setCurrentCountryIndex(0);
    setIsScoringPhase(false);
    setScoreTurnIndex(0);
  }

  // --- oynama akışı handler’ları ---
  const handleOptionSelect = opt => {
    const cc = playerCountries[currentCountryIndex];
    setChatMessages(m => [...m,{country:cc,text:opt.text}]);
    setMessageSteps(ms => ({ ...ms, [cc]: opt.next||"start" }));
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
          currentCountry={playerCountries[currentCountryIndex]}
          options={chatOptions[messageSteps[playerCountries[currentCountryIndex]]]||chatOptions.start}
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
