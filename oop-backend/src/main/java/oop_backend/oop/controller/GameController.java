package oop_backend.oop.controller;

import oop_backend.oop.model.Game;
import oop_backend.oop.model.Player;
import oop_backend.oop.model.GameData;
import oop_backend.oop.model.ChatOption;
import oop_backend.oop.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")
public class GameController {
    
    private final Map<String, Game> activeGames = new HashMap<>();
    
    @Autowired
    private GameService gameService;

    @PostMapping("/start")
    public Map<String, Object> startGame(@RequestBody StartGameRequest request) {
        System.out.println("Oyun başlatma isteği alındı!"); // Log ekle
        try {
            // Oyuncuları oluştur
            gameService.initializeGame(request.getPlayers()
                .stream()
                .map(player -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("playerId", player.getPlayerId());
                    map.put("countryName", player.getCountryName());
                    
                    // Gelen verileri logla
                    System.out.println("Player ID: " + player.getPlayerId() + 
                                       ", Country: " + player.getCountryName());
                    
                    return map;
                })
                .toList());
            
            // Oyun verilerini al
            GameData gameData = gameService.getGameData();
            
            // Yeni oyun nesnesi oluştur ve aktif oyunlara ekle
            Game game = new Game(gameService.getPlayers());
            activeGames.put(game.getGameId(), game);
            
            // Game ID'yi logla
            System.out.println("Yeni oyun başlatıldı: " + game.getGameId());
            System.out.println("Aktif oyun sayısı: " + activeGames.size());
            
            // Seçilen global problemi logla
            System.out.println("Global Problem: " + gameData.getGlobalProblem());
            
            // Oyun durumu ve verilerini döndür
            Map<String, Object> response = new HashMap<>();
            response.put("gameId", game.getGameId());
            response.put("players", gameService.getPlayers());
            response.put("gameData", gameData);
            
            return response;
        } catch (Exception e) {
            // Hataları logla
            System.err.println("Oyun başlatma hatası: " + e.getMessage());
            e.printStackTrace();
            throw e; // Hatayı yeniden fırlat
        }
    }
    
    @GetMapping("/options/{step}")
    public List<ChatOption> getChatOptions(@PathVariable String step) {
        System.out.println("Adım için seçenek talebi: " + step);
        return gameService.getChatOptionsForStep(step);
    }
    
    // İstek için veri sınıfı
    static class StartGameRequest {
        private List<Player> players;
        
        public List<Player> getPlayers() {
            return players;
        }
        
        public void setPlayers(List<Player> players) {
            this.players = players;
        }
    }
}