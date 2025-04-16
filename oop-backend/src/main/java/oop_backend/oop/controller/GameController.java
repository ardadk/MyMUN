package oop_backend.oop.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")  // Geliştirme ortamında tüm kaynaklara izin verir
public class GameController {

    @PostMapping("/start")
    public Map<String, Object> startGame(@RequestBody List<Map<String, Object>> gameData) {
        // Gelen verileri konsola yazdır
        System.out.println("Received game data: " + gameData);
        
        // Oyuncuların ülke seçimlerini işleyin
        for (Map<String, Object> player : gameData) {
            int playerNumber = ((Number) player.get("playerNumber")).intValue();
            String country = (String) player.get("country");
            System.out.println("Player " + playerNumber + " selected country: " + country);
            
            // Burada ülke seçimlerine göre oyun mantığını başlatabilirsiniz
        }
        
        return Map.of(
            "status", "success", 
            "message", "Game started successfully", 
            "playerCount", gameData.size()
        );
    }
}