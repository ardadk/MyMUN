package oop_backend.oop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

import oop_backend.oop.model.Player;
import oop_backend.oop.service.GameService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")  // Geliştirme ortamında tüm kaynaklara izin verir
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/start")
    public ResponseEntity<Map<String, Object>> startGame(@RequestBody List<Map<String, Object>> gameData) {
        // Gelen verileri konsola yazdır
        System.out.println("Received game data: " + gameData);
        
        try {
            // Oyuncu nesneleri oluştur ve oyunu başlat
            gameService.initializeGame(gameData);
            
            // Oluşturulan oyuncuları logla
            List<Player> players = gameService.getPlayers();
            for (Player player : players) {
                System.out.println(player);
            }
            
            // Başarılı yanıt döndür
            Map<String, Object> response = gameService.getGameStatus();
            response.put("status", "success");
            response.put("message", "Game started successfully with " + players.size() + " players");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error starting game: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "Failed to start game: " + e.getMessage()
            ));
        }
    }
    
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getGameStatus() {
        Map<String, Object> status = gameService.getGameStatus();
        return ResponseEntity.ok(status);
    }
}