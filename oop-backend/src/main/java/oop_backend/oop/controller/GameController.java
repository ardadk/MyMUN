package oop_backend.oop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import oop_backend.oop.model.StartGameRequest;
import oop_backend.oop.model.Player;
import oop_backend.oop.model.WorldProblem;
import oop_backend.oop.model.ProblemOption;
import oop_backend.oop.service.GameService;
import oop_backend.oop.service.GameServiceImpl;
import oop_backend.oop.service.ProblemService;
import oop_backend.oop.service.PolicyService;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*") // Frontend ile iletişim için CORS ayarları
public class GameController {

    private final GameService gameService;
    private final ProblemService problemService;
    private final PolicyService policyService;
    private Map<String, String> gameIdBySession = new HashMap<>();
    private Map<String, List<Player>> gamePlayerMap = new HashMap<>();

    public GameController(GameService gameService, ProblemService problemService, PolicyService policyService) {
        this.gameService = gameService;
        this.problemService = problemService;
        this.policyService = policyService;
    }

    @PostMapping("/start")
    public ResponseEntity<?> startGame(@RequestBody StartGameRequest request) {
        try {
            // Gelen basit oyuncu verilerini tam Player nesnelerine dönüştür
            List<Player> players = new ArrayList<>();
            
            for (StartGameRequest.PlayerRequest playerRequest : request.getPlayers()) {
                Player player = new Player(playerRequest.getUserId(), playerRequest.getCountryName());
                // Her oyuncuya rastgele bir politika ata
                player.setPolicy(policyService.getRandomPolicy());
                players.add(player);
            }
            
            // Oyunu başlat
            String gameId = gameService.startGame(players);
            
            // Oyuncu listesini sakla
            gamePlayerMap.put(gameId, players);
            
            // Rastgele seçilen problemi al
            WorldProblem problem = problemService.selectRandomProblem();
            
            // Session ID olarak ilk oyuncunun ID'sini kullan
            String sessionId = request.getPlayers().get(0).getUserId().toString();
            gameIdBySession.put(sessionId, gameId);
            
            // Oyuncu verilerini, problemi ve seçenekleri frontend'e gönder
            Map<String, Object> gameData = new HashMap<>();
            gameData.put("status", "active");
            gameData.put("problem", problem.getDescription());
            gameData.put("options", problem.getOptions());
            gameData.put("players", players); // Frontend'e tüm oyuncu detaylarını gönder
            
            return ResponseEntity.ok().body(
                Map.of(
                    "success", true, 
                    "message", "Oyun başlatıldı!",
                    "gameId", gameId,
                    "gameData", gameData
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
            System.out.println("'" + step + "' adımı için seçenekler istendi");
            
            List<ProblemOption> options = problemService.getOptionsForStep(step);
            
            if (options == null || options.isEmpty()) {
                System.out.println("UYARI: Adım için seçenek bulunamadı, varsayılan seçenek döndürülüyor");
                
                // Varsayılan bir seçenek oluştur
                List<ProblemOption> defaultOptions = new ArrayList<>();
                defaultOptions.add(new ProblemOption(
                    "default_option",
                    "Sonraki tura geç",
                    "start",
                    0,
                    0
                ));
                
                return ResponseEntity.ok(defaultOptions);
            }
            
            System.out.println("'" + step + "' adımı için " + options.size() + " seçenek döndürülüyor");
            return ResponseEntity.ok(options);
        } catch (Exception e) {
            System.err.println("Seçenek alma hatası: " + e.getMessage());
            e.printStackTrace();
            
            // Varsayılan bir seçenek oluştur
            List<ProblemOption> fallbackOptions = new ArrayList<>();
            fallbackOptions.add(new ProblemOption(
                "error_option",
                "Bir hata oluştu, sonraki tura geç",
                "start",
                0,
                0
            ));
            
            // Hata durumunda varsayılan seçenekleri döndür, 500 hatası yerine
            return ResponseEntity.ok(fallbackOptions);
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
    
    @GetMapping("/problem/next/{gameId}")
    public ResponseEntity<?> getNextProblem(@PathVariable String gameId) {
        try {
            // Bir önceki problemden farklı yeni bir problem seç
            WorldProblem currentProblem = gameService.getCurrentProblem(gameId);
            WorldProblem newProblem = null;
            if (newProblem == null) {
                System.out.println("UYARI: Mevcut problem bulunamadı, yeni problem seçiliyor...");
            }
            
            // Mevcut problemi konsola yazdır
            System.out.println("Mevcut problem: " + (currentProblem != null ? 
                    currentProblem.getDescription() + " (ID: " + currentProblem.getId() + ")" : "Yok"));
            
            // Tüm problemleri al
            List<WorldProblem> allProblems = problemService.getAllProblems();
            System.out.println("Toplam problem sayısı: " + allProblems.size());
            
            // Problemlerin sayısı 1'den fazlaysa, mevcut problemden farklı bir tane seç
            if (allProblems.size() > 1 && currentProblem != null) {
                // Mevcut problem ID'sini dışlayarak rastgele bir problem seç
                List<WorldProblem> otherProblems = allProblems.stream()
                        .filter(p -> !p.getId().equals(currentProblem.getId()))
                        .collect(Collectors.toList());
                
                // Başka problemlerin olduğundan emin ol
                if (otherProblems.isEmpty()) {
                    // Hiç uygun problem yoksa, rastgele bir problem seç
                    newProblem = problemService.selectRandomProblem();
                } else {
                    // Rastgele bir problem seç
                    int randomIndex = new Random().nextInt(otherProblems.size());
                    newProblem = otherProblems.get(randomIndex);
                }
            } else {
                // Tek problem varsa veya mevcut problem null ise, rastgele bir problem seç
                newProblem = problemService.selectRandomProblem();
            }
            
            if (newProblem == null) {
                return ResponseEntity.badRequest().body(
                    Map.of("success", false, "message", "Yeni problem seçilemedi")
                );
            }
            
            // Seçenekleri kontrol et
            if (newProblem.getOptions() == null || newProblem.getOptions().isEmpty()) {
                System.out.println("UYARI: Seçilen problemin seçenekleri yok!");
            } else {
                System.out.println("Seçilen problem için " + newProblem.getOptions().size() + " seçenek var");
                for (ProblemOption option : newProblem.getOptions()) {
                    System.out.println("  - " + option.getText());
                }
            }
            
            // Oyun kaydındaki problemi güncelle
            gameService.updateGameProblem(gameId, newProblem);
            
            // Detaylı log kaydı
            System.out.println("\n🔄 YENİ PROBLEM SEÇİLDİ 🔄");
            System.out.println("Önceki problem: " + (currentProblem != null ? 
                    currentProblem.getDescription() + " (ID: " + currentProblem.getId() + ")" : "İlk problem"));
            System.out.println("Yeni problem: " + newProblem.getDescription() + " (ID: " + newProblem.getId() + ")");
            
            return ResponseEntity.ok().body(newProblem);
        } catch (Exception e) {
            e.printStackTrace(); // Hata izlemesi için
            return ResponseEntity.badRequest().body(
                Map.of("success", false, "message", "Sonraki problem alınamadı: " + e.getMessage())
            );
        }
    }
    
    @GetMapping("/players/{gameId}")
    public ResponseEntity<?> getGamePlayers(@PathVariable String gameId) {
        List<Player> players = gamePlayerMap.get(gameId);
        if (players != null) {
            return ResponseEntity.ok().body(players);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/player/rating")
    public ResponseEntity<?> updatePlayerRating(@RequestBody Map<String, Object> ratingUpdate) {
        try {
            String gameId = (String) ratingUpdate.get("gameId");
            Long playerId = Long.valueOf(ratingUpdate.get("playerId").toString());
            int newRating = (Integer) ratingUpdate.get("rating");
            
            List<Player> players = gamePlayerMap.get(gameId);
            if (players == null) {
                return ResponseEntity.notFound().build();
            }
            
            boolean playerFound = false;
            for (Player player : players) {
                if (player.getUserId().equals(playerId)) {
                    player.setRating(newRating);
                    playerFound = true;
                    break;
                }
            }
            
            if (!playerFound) {
                return ResponseEntity.notFound().build();
            }
            
            return ResponseEntity.ok().body(
                Map.of("success", true, "message", "Oyuncu puanı güncellendi")
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                Map.of("success", false, "message", "Puan güncellenemedi: " + e.getMessage())
            );
        }
    }
}