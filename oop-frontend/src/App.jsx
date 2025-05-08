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
import GameOver         from './components/GameOver';
import Scoreboard from './components/RightPanel/Scoreboard';

import { Player } from './models/Player';
import { GameService } from './services/GameService';

// Statik veri importları kaldırıldı - artık hepsi backend'den gelecek

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
  const [globalProblem, setGlobalProblem] = useState("");
  const [scoreTurnIndex, setScoreTurnIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [isScoringPhase, setIsScoringPhase] = useState(false);
  const [scores, setScores] = useState({});
  const [voteCounts, setVoteCounts] = useState({});
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  // --- hangi ülke detaya bakıyor ---
  const [viewCountry, setViewCountry] = useState(null);
  // --- oyun kimliği ---


  // Backend'den alınan skorları tutacak yeni state ekle
  const [gameId, setGameId] = useState(null); // Ayrı bir state olarak gameId
  const [gameInfo, setGameInfo] = useState({
    econScores: {},
    welfareScores: {},
    policies: {},
  });
  const [players, setPlayers] = useState([]);

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
  
  // Oyun başlama yanıtında artık politik kurallar ve başlangıç skorları backend'den gelecek
  const handleSubmitToBackend = async () => {
    try {
      setIsSubmitting(true);
      
      // Düzeltilmiş veri yapısı
      const playerRequests = playerCountries.map((country, index) => ({
        userId: (index + 1),
        countryName: country
      }));
      
      console.log("Gönderilen oyuncu verileri:", playerRequests);
      const response = await GameService.startGame(playerRequests);
      console.log("Alınan oyun verisi:", response);
      
      const gameData = response.gameData || {};
      
      setGameId(response.gameId);
      setGlobalProblem(gameData.problem?.description || "");
      
      // Set initial options directly to chatMessages
      if (gameData.problem?.options) {
        setChatMessages(gameData.problem.options);
      }
      
      // Oyuncuları kaydet
      if (gameData.players) {
        console.log("Backend'den alınan oyuncular:", gameData.players);
        
        // Player modellerine dönüştür
        const playerModels = Player.listFromApi(gameData.players);
        setPlayers(playerModels);
        
        // Ekonomi ve refah durumlarını ayarla
        const econData = {};
        const welfareData = {};
        const policyData = {};
        
        gameData.players.forEach(player => {
          if (player.countryName) {
            econData[player.countryName] = player.economyStatus || 3;
            welfareData[player.countryName] = player.welfare || 3;
            if (player.policy) {
              policyData[player.countryName] = player.policy;
            }
          }
        });
        
        // GameInfo state'ini güncelle
        setGameInfo(prevInfo => ({
          ...prevInfo,
          econScores: econData,
          welfareScores: welfareData
        }));
        
        // Politikaları ayarla
        setCountryPolicies(policyData);
      }
      
      setGameStage("playing");
    } catch (error) {
      console.error("Backend isteği başarısız:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const updatePlayerRating = async (playerId, rating) => {
    try {
      await GameService.updatePlayerRating(gameId, playerId, rating);
      
      // State'i güncelle
      setScores(prevScores => ({
        ...prevScores,
        [playerId]: rating
      }));
    } catch (error) {
      console.error("Puanlama hatası:", error);
    }
  };

  const handleRestart = () => {
    // Reset rounds counter
    setRoundsPlayed(0);
    
    // tüm state'leri sıfırla
    setGameStage("start");
    setSelectedPlayersCount(1);
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
  };

  // --- oynama akışı handler'ları ---
  const handleOptionSelect = async (opt) => {
    if (!opt) {
      console.error("Geçersiz seçenek seçildi:", opt);
      return;
    }
    
    console.log("Seçilen seçenek:", opt);
    try {
      const payload = {
        country: playerCountries[currentCountryIndex],
        welfareEffect: opt.welfareEffect || 0,
        economyEffect: opt.economyEffect || 0
      };

      console.log("Gönderilen veri:", payload);
      
      const response = await axios.put(
        `http://localhost:8080/api/game/info/${gameId}`, 
        payload
      );
      
      console.log("Seçenek uygulandı:", response.data);

      // Güncellenmiş skorları almak için fetchGameInfo çağrısı ekleyin
      await fetchGameInfo();

      // Sıradaki oyuncuya geç
      if (currentCountryIndex < playerCountries.length - 1) {
        setCurrentCountryIndex(prev => prev + 1);
      } else {
        // Tüm oyuncular seçim yaptığında puanlama fazına geç
        setCurrentCountryIndex(0); // Sıfırla
        setIsScoringPhase(true);
        setScoreTurnIndex(0);
      }

    } catch (error) {
      console.error("Seçenek uygulanamadı:", error.response?.data || error);
    }
};

const handleVoteSubmit = async (votes) => {
    const voter = playerCountries[scoreTurnIndex];
    const newScores = {...scores}, newCounts={...voteCounts};
    
    Object.entries(votes).forEach(([t,p]) => {
      newScores[t] = (newScores[t] || 0) + p;
      newCounts[t] = (newCounts[t] || 0) + 1;
    });
    
    setScores(newScores);
    setVoteCounts(newCounts);

    // Sıradaki oyuncuya geç
    if (scoreTurnIndex < playerCountries.length - 1) {
      setScoreTurnIndex(prev => prev + 1);
    } else {
      // Tüm oyuncular oy verdiğinde yeni tura geç
      setIsScoringPhase(false);
      setScoreTurnIndex(0);
      
      const newRoundsPlayed = roundsPlayed + 1;
      setRoundsPlayed(newRoundsPlayed);
      
      if (newRoundsPlayed >= 9) {
        console.log("3 tur tamamlandı, oyun bitti!");
        setGameStage("gameOver");
        return;
      }
      
      // Yeni tur için problem al
      console.log("Tur tamamlandı, yeni problem alınıyor...");
      await fetchProblem();
    }
};

  // Oyun başladığında veya gameId değiştiğinde oyun bilgilerini çek
  useEffect(() => {
    if (gameId && gameStage === "playing") {
      console.log("GameID ve gameStage uygun, oyun bilgileri çekiliyor");
      fetchGameInfo();
    } else {
     
    }
  }, [gameId, gameStage]);

  // Backend'den oyun bilgilerini çekecek fonksiyon ekle
  const fetchGameInfo = async () => {
    if (!gameId) {
      console.error("Oyun ID'si tanımlı değil, oyun bilgileri çekilemiyor");
      return; // gameId yoksa fonksiyondan erken çık
    }
    
    try {
      console.log(`${gameId} ID'li oyun için bilgiler alınıyor...`);
      const response = await axios.get(`http://localhost:8080/api/game/info/${gameId}`);
      console.log("gameInfo içeriği alt satırda:")
      console.log(response.data)
      // Yanıtı gameInfo'ya set et
      setGameInfo(response.data);
      setCountryPolicies(response.data.policies || {});
    } catch (error) {
      console.error("Oyun bilgileri alınırken hata oluştu:", error);
    }
  };

  // fetchGameInfoDirectly fonksiyonunu güncelle
  const fetchGameInfoDirectly = async (id) => {
    if (!id) {
      console.error("fetchGameInfoDirectly: Geçerli bir ID verilmedi");
      return;
    }
    
    try {
      console.log(`${id} ID'li oyun için bilgiler alınıyor...`);
      const response = await axios.get(`http://localhost:8080/api/game/info/${id}`);
      
      setGameInfo(response.data);
      setCountryPolicies(response.data.policies || {});
    } catch (error) {
      console.error("Oyun bilgileri alınırken hata oluştu:", error);
    }
  };

  const fetchProblem = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/game/problem/next/${gameId}`);
      console.log("Backend'den gelen yanıt:", response.data);

      // Backend'den gelen veri yapısı:
      // {
      //   problem: { id, description, options },
      //   options: []
      // }
      
      if (response.data?.problem?.description) {
        // Problem açıklamasını ayarla
        setGlobalProblem(response.data.problem.description);
        console.log("Yeni problem ayarlandı:", response.data.problem.description);
        
        // Backend'den gelen seçenekleri kullan
        if (Array.isArray(response.data.options)) {
          setChatMessages(response.data.options);
          console.log("Yeni seçenekler ayarlandı:", response.data.options);
        } else {
          console.error("Seçenekler dizi formatında değil:", response.data.options);
        }
      } else {
        console.error("Problem verisi eksik:", response.data);
      }
    } catch (error) {
      console.error("Problem alınamadı:", error);
    }
  };

  // --- render
  switch(gameStage) {
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
            onBack={() => setViewCountry(null)}
          />
        );
      }

      // Normal iki panelli sohbet/oylama
      const left = (
        <LeftPanel
          playerCountries={playerCountries}
          onCountrySelect={c => setViewCountry(c)}
          econScores={gameInfo.econScores}
          welfareScores={gameInfo.welfareScores}
          countryPolicies={countryPolicies}
        />
      );
      
      const right = (
        <RightPanel
          problem={globalProblem}
          options={chatMessages} // Artık chatMessages kullanılıyor
          onSelectOption={handleOptionSelect}
          isScoringPhase={isScoringPhase}
          voter={isScoringPhase 
            ? playerCountries[scoreTurnIndex] // Puanlama fazındaki ülke
            : playerCountries[currentCountryIndex] // Seçim fazındaki ülke
          }
          onVote={handleVoteSubmit}
          totalScores={scores}
          voteCounts={voteCounts}
          chatMessages={chatMessages}
        />
      );

      return (
        <GameScreenLayout left={left} right={right}>
          <Scoreboard 
            totalScores={scores} 
            voteCounts={voteCounts}
            players={players} 
            gameInfo={gameInfo}
          />
        </GameScreenLayout>
      );

    case "gameOver":
      return (
        <GameOver 
          onRestart={handleRestart}
          totalScores={scores}
          voteCounts={voteCounts}
          players={players}
          gameInfo={gameInfo}  // gameInfo prop'unu ekliyoruz
        />
      );

    default:
      return <div>Bir şeyler ters gitti…</div>;
  }
}
