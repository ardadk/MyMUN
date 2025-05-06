package oop_backend.oop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import oop_backend.oop.model.GameStartRequest;
import oop_backend.oop.model.WorldProblem;
import oop_backend.oop.model.ProblemOption;
import oop_backend.oop.service.GameService;
import oop_backend.oop.service.ProblemService;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://localhost:5173") // Sadece frontend URL'sine izin ver
public class GameController {

    private final GameService gameService;
    private final ProblemService problemService;
    private Map<String, String> gameIdBySession = new HashMap<>();

    public GameController(GameService gameService, ProblemService problemService) {
        this.gameService = gameService;
        this.problemService = problemService;
    }

    @PostMapping("/start")
    public ResponseEntity<?> startGame(@RequestBody GameStartRequest request) {
        try {
            // Oyunu başlat
            gameService.startGame(request.getPlayers());
            
            // Rastgele seçilen problemi al
            WorldProblem problem = problemService.selectRandomProblem();
            
            // Benzersiz bir oyun ID'si oluştur
            String gameId = "game_" + System.currentTimeMillis();
            String sessionId = request.getPlayers().get(0).getPlayerId().toString();
            gameIdBySession.put(sessionId, gameId);
            
            // Problemi ve seçenekleri frontend'e gönder
            return ResponseEntity.ok().body(
                Map.of(
                    "success", true, 
                    "message", "Oyun başlatıldı!",
                    "gameId", gameId,
                    "gameData", Map.of(
                        "status", "active",
                        "problem", problem.getDescription(),
                        "options", problem.getOptions()
                    )
                )
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                Map.of("success", false, "message", "Oyun başlatılamadı: " + e.getMessage())
            );
        }
    }
    
    @GetMapping("/options/{step}")
    public ResponseEntity<?> getOptionsForStep(@PathVariable String step) {
        try {
            List<ProblemOption> options = problemService.getOptionsForStep(step);
            return ResponseEntity.ok().body(options);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                Map.of("success", false, "message", "Seçenekler alınamadı: " + e.getMessage())
            );
        }
    }
    
    @GetMapping("/problem/{gameId}")
    public ResponseEntity<?> getCurrentProblem(@PathVariable String gameId) {
        try {
            WorldProblem problem = gameService.getCurrentProblem(gameId);
            if (problem != null) {
                return ResponseEntity.ok().body(problem);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                Map.of("success", false, "message", "Problem alınamadı: " + e.getMessage())
            );
        }
    }
}