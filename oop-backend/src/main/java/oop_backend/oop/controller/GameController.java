package oop_backend.oop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import oop_backend.oop.model.GameStartRequest;
import oop_backend.oop.service.GameService;
import java.util.Map;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*") // Frontend ile iletişim için CORS ayarları
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping("/start")
    public ResponseEntity<?> startGame(@RequestBody GameStartRequest request) {
        try {
            // Oyunu başlat ve sonuç döndür
            gameService.startGame(request.getPlayers());
            return ResponseEntity.ok().body(
                Map.of(
                    "success", true, 
                    "message", "Oyun başlatıldı!",
                    "gameData", Map.of("status", "active")
                )
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                Map.of("success", false, "message", "Oyun başlatılamadı: " + e.getMessage())
            );
        }
    }
}