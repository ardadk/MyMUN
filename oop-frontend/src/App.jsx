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
  const [chatMessages, setChatMessages] = useState([]);
  const [messageSteps, setMessageSteps] = useState({});
  const [isScoringPhase, setIsScoringPhase] = useState(false);
  const [scoreTurnIndex, setScoreTurnIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [voteCounts, setVoteCounts] = useState({});
  const [chatOptionsMap, setChatOptionsMap] = useState({});
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
      setGlobalProblem(gameData.problem?.description || gameData.problem || "");
      
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
      
      // Seçenekleri doğrudan ayarla
      if (Array.isArray(gameData.options) && gameData.options.length > 0) {
        console.log("Başlangıç seçenekleri:", gameData.options);
        setChatOptionsMap({ start: gameData.options });
      } else {
        console.error("Seçenekler bulunamadı veya boş:", gameData.options);
        // Varsayılan seçenek ekle
        setChatOptionsMap({ 
          start: [{
            id: "default",
            text: "Varsayılan seçenek - Sonraki tura geç",
            next: "start",
            economyEffect: 0,
            welfareEffect: 0
          }]
        });
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
    if (!opt) {
      console.error("Geçersiz seçenek seçildi:", opt);
      return;
    }
    
    console.log("Seçilen seçenek:", opt);
    const cc = playerCountries[currentCountryIndex];
    
    // Seçeneği sohbet mesajlarına ekle
    setChatMessages(m => [...m,{country:cc,text:opt.text}]);
    
    // Ekonomi ve refah skorlarını frontend'de güncelleme yerine backend'e gönder
    try {
      const response = await axios.put(`http://localhost:8080/api/game/info/${gameId}`, {
        country: cc,
        economyEffect: opt.economyEffect || 0,
        welfareEffect: opt.welfareEffect || 0
      });
      
      console.log("Skor güncelleme yanıtı:", response.data);
      
      // Güncel oyun bilgilerini yeniden çek
      await fetchGameInfo();
    } catch (error) {
      console.error("Skorlar güncellenirken hata:", error);
    }
    
    // Seçilen seçeneğin next değerine göre messageSteps'i güncelle
    const nextStep = opt.next || "start";
    console.log(`Sonraki adım: ${nextStep}`);
    setMessageSteps(ms => ({ ...ms, [cc]: nextStep }));
    
    // Sonraki adım seçeneklerini backend'den al
    try {
      console.log(`${nextStep} için seçenekler alınıyor...`);
      
      // Eğer zaten bu adımın seçenekleri yüklüyse, tekrar isteme
      if (chatOptionsMap[nextStep] && chatOptionsMap[nextStep].length > 0) {
        console.log(`${nextStep} için seçenekler zaten yüklü:`, chatOptionsMap[nextStep]);
      } else {
        const response = await axios.get(`http://localhost:8080/api/game/options/${nextStep}`);
        console.log(`${nextStep} için alınan seçenekler:`, response.data);
        
        if (response.data && response.data.length > 0) {
          // Sadece veri varsa güncelle
          setChatOptionsMap(prev => ({ ...prev, [nextStep]: response.data }));
        } else {
          console.warn(`${nextStep} için seçenek bulunamadı`);
          // Varsayılan bir seçenek ekle
          setChatOptionsMap(prev => ({ 
            ...prev, 
            [nextStep]: [{
              id: "default",
              text: "Sonraki tura geç",
              next: "start",
              economyEffect: 0,
              welfareEffect: 0
            }]
          }));
        }
      }
    } catch (error) {
      console.error(`${nextStep} için seçenekler alınamadı:`, error);
      
      // Hata durumunda varsayılan seçenek ekle
      setChatOptionsMap(prev => ({ 
        ...prev, 
        [nextStep]: [{
          id: "error",
          text: "Bir hata oluştu, sonraki tura geç",
          next: "start",
          economyEffect: 0,
          welfareEffect: 0
        }]
      }));
    }
    
    // Sıradaki ülkeye geç
    const nextIdx = (currentCountryIndex + 1) % playerCountries.length;
    console.log(`Sıra ${playerCountries[nextIdx]}'ye geçiyor`);
    setCurrentCountryIndex(nextIdx);
    
    // Bir tur tamamlandıysa puanlama aşamasına geç
    if (nextIdx === 0) {
      console.log("Tur tamamlandı, puanlama aşamasına geçiliyor");
      setIsScoringPhase(true);
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

    if (scoreTurnIndex < playerCountries.length-1) {
      setScoreTurnIndex(i => i+1);
    } else {
      // Tüm oyuncular oy verdi, yeni tura geç
      setIsScoringPhase(false);
      setScoreTurnIndex(0);
      setCurrentCountryIndex(0);
      
      console.log("Tur tamamlandı, yeni problem alınıyor...");
      
      try {
        // Yeni bir problem al
        const response = await axios.get(`http://localhost:8080/api/game/problem/next/${gameId}`);
        console.log("Backend'den gelen yanıt:", response.data);
        
        if (response.data && response.data.description) {
          // Yeni problemin açıklamasını kaydet
          setGlobalProblem(response.data.description);
          
          // Seçenekler dizisini kontrol et
          if (response.data.options && Array.isArray(response.data.options) && response.data.options.length > 0) {
            console.log("Yeni seçenekler alındı:", response.data.options);
            
            // Tüm önceki adımları ve seçenekleri temizle, sadece yeni başlangıç seçeneklerini ekle
            setChatOptionsMap({
              start: response.data.options
            });
            
            // Adım takibini sıfırla
            setMessageSteps({});
            
            // Mesaj geçmişini sıfırla
            setChatMessages([]);
            
            console.log("Yeni problem ayarlandı:", response.data.description);
            console.log("Yeni seçenekler ayarlandı:", response.data.options);
          } else {
            console.error("Yeni problem için seçenekler eksik veya boş:", response.data);
          }
        } else {
          console.error("Yeni problem alınamadı veya geçerli değil:", response.data);
        }
      } catch (error) {
        console.error("Yeni problem alınamadı:", error.response?.data || error.message);
      }
    }
  };

  // Oyun başladığında veya gameId değiştiğinde oyun bilgilerini çek
  useEffect(() => {
    if (gameId && gameStage === "playing") {
      console.log("GameID ve gameStage uygun, oyun bilgileri çekiliyor");
      fetchGameInfo();
    } else {
      console.log("GameID veya gameStage uygun değil, oyun bilgileri çekilmiyor");
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

      // Şu anki ülkenin adımı için seçenekleri al
      const currentCountry = playerCountries[currentCountryIndex];
      const currentStep = messageSteps[currentCountry] || "start";
      const currentOptions = chatOptionsMap[currentStep] || [];

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
          currentCountry={currentCountry}
          options={currentOptions}
          onSelectOption={handleOptionSelect}
          isScoringPhase={isScoringPhase}
          voter={playerCountries[scoreTurnIndex]}
          onVote={handleVoteSubmit}
          totalScores={scores}
          voteCounts={voteCounts}
          chatMessages={chatMessages}
        />
      );

      return <GameScreenLayout left={left} right={right}/>;

    default:
      return <div>Bir şeyler ters gitti…</div>;
  }
}
