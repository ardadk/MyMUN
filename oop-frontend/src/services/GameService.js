import axios from 'axios';
import { Player } from '../models/Player';
import { WorldProblem } from '../models/WorldProblem';

export class GameService {
  static async startGame(players) {
    try {
      console.log("Backend'e gönderilen veri:", { players });
      
      const response = await axios.post('http://localhost:8080/api/game/start', { players });
      console.log("Backend'den gelen yanıt:", response.data);
      
      // Backend yanıtını doğrudan döndür
      return response.data;
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