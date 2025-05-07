import axios from 'axios';
import { Player } from '../models/Player';
import { WorldProblem } from '../models/WorldProblem';

export class GameService {
  static async startGame(players) {
    try {
      console.log("Backend'e gönderilen veri:", { players });
      
      const response = await axios.post('http://localhost:8080/api/game/start', { players });
      console.log("Backend'den gelen yanıt:", response.data);
      
      // Backend yanıt yapısını detaylı logla
      const { gameId, gameData } = response.data || {};
      console.log("Game ID:", gameId);
      console.log("Game Data:", gameData);
      console.log("Problem:", gameData?.problem);
      console.log("Options:", gameData?.options);
      
      // Eğer options doğrudan gameData'da değilse, daha derinlerde olabilir
      let options = [];
      if (gameData?.options && Array.isArray(gameData.options)) {
        options = gameData.options;
      } else if (gameData?.problem?.options && Array.isArray(gameData.problem.options)) {
        options = gameData.problem.options;
      }
      
      return {
        gameId: gameId || "temp-id",
        problem: typeof gameData?.problem === 'object' ? gameData.problem.description : gameData?.problem || "Dünya çapında bir ekonomik kriz başladı.",
        options: options
      };
    } catch (error) {
      console.error('Oyun başlatma hatası:', error);
      throw error;
    }
  }

  static async updatePlayerRating(gameId, playerId, rating) {
    try {
      const response = await axios.post(`http://localhost:8080/api/game/${gameId}/rate/${playerId}`, { rating });
      return response.data;
    } catch (error) {
      console.error('Oyuncu puanlama hatası:', error);
      throw error;
    }
  }
}