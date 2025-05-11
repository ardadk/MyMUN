// importlarımız
import React, { useState, useEffect } from "react";
import axios from "axios";
import StartScreen from "./components/StartScreen";
import CountrySelection from "./components/CountrySelection";
import GameSummary from "./components/GameSummary";
import GameScreenLayout from "./components/GameScreenLayout";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel";
import CountryPage from "./components/CountryPage/CountryPage";
import GameOver from "./components/GameOver";
import ChatBox from "./components/ChatBox";
import { Player } from "./models/Player";
import { GameService } from "./services/GameService";

export default function App() {
  // stateler ve tanımlamaları
  const [gameStage, setGameStage] = useState("start");
  const [selectedPlayersCount, setSelectedPlayersCount] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerCountries, setPlayerCountries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [countryPolicies, setCountryPolicies] = useState({});
  const [globalProblem, setGlobalProblem] = useState("");
  const [scoreTurnIndex, setScoreTurnIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [isScoringPhase, setIsScoringPhase] = useState(false);
  const [scores, setScores] = useState({});
  const [voteCounts, setVoteCounts] = useState({});
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [viewCountry, setViewCountry] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [gameInfo, setGameInfo] = useState({
    econScores: {},
    welfareScores: {},
    policies: {},
  });
  const [players, setPlayers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  //start butonuna tıklandığında
  const handleStartClick = () => {
    setSelectedPlayersCount(5); 
    setPlayerCountries(Array(5).fill(""));
    setCurrentPlayerIndex(0);
    setGameStage("selectCountries");
  };
  const handlePlayerCountChange = (cnt) => setSelectedPlayersCount(cnt);
  const handlePlayerCountSubmit = () => {
    setPlayerCountries(Array(selectedPlayersCount).fill(""));
    setCurrentPlayerIndex(0);
    setGameStage("selectCountries");
  };
  const handleCountryChange = (country) => {
    const copy = [...playerCountries];
    copy[currentPlayerIndex] = country;
    setPlayerCountries(copy);
  };
  const handleNextPlayer = () => {
    if (currentPlayerIndex < selectedPlayersCount - 1)
      setCurrentPlayerIndex((i) => i + 1);
    else setGameStage("completed");
  };

  //backend'den gelen verileri işleme
  const handleSubmitToBackend = async () => {
    try {
      setIsSubmitting(true);

      const playerRequests = playerCountries.map((country, index) => ({
        userId: index + 1,
        countryName: country,
      }));

      const response = await GameService.startGame(playerRequests);
      const gameData = response.gameData || {};

      setGameId(response.gameId);
      setGlobalProblem(gameData.problem?.description || "");

      if (gameData.problem?.options) {
        setChatMessages(gameData.problem.options);
      }

      if (gameData.players) {
        const playerModels = Player.listFromApi(gameData.players);
        setPlayers(playerModels);

        const econData = {};
        const welfareData = {};
        const policyData = {};

        gameData.players.forEach((player) => {
          if (player.countryName) {
            econData[player.countryName] = player.economyStatus || 3;
            welfareData[player.countryName] = player.welfare || 3;
            if (player.policy) {
              policyData[player.countryName] = player.policy;
            }
          }
        });

        setGameInfo((prevInfo) => ({
          ...prevInfo,
          econScores: econData,
          welfareScores: welfareData,
        }));

        setCountryPolicies(policyData);
      }

      setGameStage("playing");
    } catch (error) {
      console.error("Backend isteği başarısız:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Oyuncu puanlarını güncelleme
  const updatePlayerRating = async (playerId, rating) => {
    try {
      await GameService.updatePlayerRating(gameId, playerId, rating);
      setScores((prevScores) => ({
        ...prevScores,
        [playerId]: rating,
      }));
    } catch (error) {
      console.error("Puanlama hatası:", error);
    }
  };

  // Oyunu yeniden başlatma
  const handleRestart = () => {
      // Keep selectedPlayersCount as is
    setRoundsPlayed(0);
    setGameStage("start");
    setCurrentPlayerIndex(0);
    setPlayerCountries([]);
    setIsSubmitting(false);
    setCurrentCountryIndex(0);
    setCountryPolicies({});
    setGlobalProblem("");
    setChatMessages([]);
    setIsScoringPhase(false);
    setScoreTurnIndex(0);
    setScores({});
    setVoteCounts({});
    setViewCountry(null);
    setSelectedOptions([]); // Clear selected options
    // Removed: setSelectedPlayersCount(1)
  };

  //Seçeneklerin seçilmesi ekonomi ve refah etkileri
  const handleOptionSelect = async (opt) => {
    if (!opt) return;

    setSelectedOptions(prev => [...prev, {
      voter: playerCountries[currentCountryIndex],
      text: opt.text
    }]);

    const payload = {
      country: playerCountries[currentCountryIndex],
      welfareEffect: opt.welfareEffect || 0,
      economyEffect: opt.economyEffect || 0,
    };

    try {
      await axios.put(
        `http://localhost:8080/api/game/info/${gameId}`,
        payload
      );
      await fetchGameInfo();

      if (currentCountryIndex < playerCountries.length - 1) {
        setCurrentCountryIndex((prev) => prev + 1);
      } else {
        setCurrentCountryIndex(0);
        setIsScoringPhase(true);
        setScoreTurnIndex(0);
      }
    } catch (error) {
      console.error("Seçenek uygulanamadı:", error.response?.data || error);
    }
  };
// Oyuncunun oylama yapması
  const handleVoteSubmit = (votes) => {
    const newVoteCounts = { ...voteCounts };
    Object.entries(votes).forEach(([countryName, vote]) => {
      newVoteCounts[countryName] = (newVoteCounts[countryName] || 0) + Number(vote);
    });
    setVoteCounts(newVoteCounts);

    if (scoreTurnIndex < playerCountries.length - 1) {
      setScoreTurnIndex((prev) => prev + 1);
    } else {
      setIsScoringPhase(false);
      setScoreTurnIndex(0);
      setRoundsPlayed((prev) => {
        const newRounds = prev + 1;
        if (newRounds >= 5) {
          setGameStage("gameOver");
        } else {
          fetchProblem();
        }
        return newRounds;
      });
    }
  };
// Oyuncu bilgilerini güncelleme
  useEffect(() => {
    if (gameId && gameStage === "playing") {
      fetchGameInfo();
    }
  }, [gameId, gameStage]);

  const fetchGameInfo = async () => {
    if (!gameId) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/game/info/${gameId}`
      );
      setGameInfo(response.data);
      setCountryPolicies(response.data.policies || {});
    } catch (error) {
      console.error("Oyun bilgileri alınırken hata oluştu:", error);
    }
  };
// Problem bilgilerini güncelleme
  const fetchProblem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/game/problem/next/${gameId}`
      );
      if (response.data?.problem?.description) {
        setGlobalProblem(response.data.problem.description);
        if (Array.isArray(response.data.options)) {
          setChatMessages(response.data.options);
        }
      }
    } catch (error) {
      console.error("Problem alınamadı:", error);
    }
  };
// div yapısı

  switch (gameStage) {
    case "start":
      return <StartScreen onStart={handleStartClick} />;

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
      if (viewCountry) {
        return (
          <CountryPage
            countryCode={viewCountry}
            econ={gameInfo.econScores[viewCountry]}
            welfare={gameInfo.welfareScores[viewCountry]}
            policy={countryPolicies[viewCountry] || gameInfo.policies[viewCountry]}
            problem={globalProblem}
            totalScores={scores}
            voteCounts={voteCounts}
            players={players}
            gameInfo={gameInfo}
            onBack={() => setViewCountry(null)}
          />
        );
      }

      const left = (
        <LeftPanel
          playerCountries={playerCountries}
          onCountrySelect={(c) => setViewCountry(c)}
          econScores={gameInfo.econScores}
          welfareScores={gameInfo.welfareScores}
          countryPolicies={countryPolicies}
          gameInfo={gameInfo}
          voteCounts={voteCounts}
          players={players}
          options={chatMessages}
          selectedOptions={selectedOptions}
        />
      );

      const right = (
        <>
          <RightPanel
            problem={globalProblem}
            options={chatMessages}
            onSelectOption={handleOptionSelect}
            isScoringPhase={isScoringPhase}
            voter={
              isScoringPhase
                ? playerCountries[scoreTurnIndex]
                : playerCountries[currentCountryIndex]
            }
            onVote={handleVoteSubmit}
            gameInfo={gameInfo}
            players={players}
          />
        </>
      );

      const center = (
        <div className="game-center-content">
          <h2>Konsey Toplantısı</h2>
          <ChatBox 
            problem={globalProblem}
            selectedOptions={selectedOptions}
          />
        </div>
      );

      return (
        <GameScreenLayout 
          left={left} 
          center={center} // Yeni center prop'u
          right={right}
        />
      );

    case "gameOver":
      return (
        <GameOver
          onRestart={handleRestart}
          totalScores={scores}
          voteCounts={voteCounts}
          players={players}
          gameInfo={gameInfo}
        />
      );

    default:
      return <div>Bir şeyler ters gitti…</div>;
  }
}
