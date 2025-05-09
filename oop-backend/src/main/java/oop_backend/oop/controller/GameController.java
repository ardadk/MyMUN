package oop_backend.oop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import oop_backend.oop.model.StartGameRequest;
import oop_backend.oop.model.Player;
import oop_backend.oop.model.WorldProblem;
import oop_backend.oop.service.GameService;
import oop_backend.oop.service.ProblemService;
import oop_backend.oop.service.PolicyService;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://localhost:5173") // Sadece frontend URL'sine izin ver
public class GameController {

    private final GameService gameService;
    private final ProblemService problemService;
    private final PolicyService policyService;
    private Map<String, List<Player>> gamePlayerMap = new HashMap<>();

    public GameController(GameService gameService, ProblemService problemService, PolicyService policyService) {
        this.gameService = gameService;
        this.problemService = problemService;
        this.policyService = policyService;
    }

    @PostMapping("/start")
    public ResponseEntity<?> startGame(@RequestBody StartGameRequest request) {
        try {
            System.out.println("Oyun başlatma isteği: " + request);

            // Rastgele bir problem seç
            WorldProblem selectedProblem = problemService.selectRandomProblem();
            System.out.println("Seçilen problem: " + selectedProblem);

            // Oyun kimliği oluştur
            String gameId = UUID.randomUUID().toString();

            // PlayerRequest nesnelerini Player nesnelerine dönüştürün
            List<Player> players = new ArrayList<>();
            for (StartGameRequest.PlayerRequest playerRequest : request.getPlayers()) {
                Player player = new Player(playerRequest.getUserId(), playerRequest.getCountryName());
                player.setPolicy(policyService.getRandomPolicy());
                players.add(player);
            }

            // Oyuncuları gamePlayerMap'e ekle
            gamePlayerMap.put(gameId, players);
            System.out.println("Oyuncular kaydedildi, game ID: " + gameId + ", Oyuncu sayısı: " + players.size());

            // GameService ile oyunu başlat
            gameService.startGame(players);

            // Yanıtı hazırla
            Map<String, Object> gameData = new HashMap<>();
            gameData.put("problem", selectedProblem);
            gameData.put("options", selectedProblem.getOptions());
            gameData.put("players", players); // Oyuncuları da yanıta ekle

            Map<String, Object> response = new HashMap<>();
            response.put("gameId", gameId);
            response.put("gameData", gameData);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Oyun başlatma hatası: " + e.getMessage());
        }
    }

    @GetMapping("/problem/next/{gameId}")
    public ResponseEntity<?> getNextProblem(@PathVariable("gameId") String gameId) {
        try {
            System.out.println("Yeni problem isteniyor - gameId: " + gameId);

            // Yeni bir problem seç
            WorldProblem newProblem = problemService.selectRandomProblem();
            System.out.println("Seçilen yeni problem: " + newProblem);

            // Oyundaki mevcut problemi güncelle
            gameService.updateGameProblem(gameId, newProblem);

            // Yanıtı hazırla
            Map<String, Object> response = new HashMap<>();
            response.put("problem", newProblem);
            response.put("options", newProblem.getOptions());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(
                    Map.of("success", false, "message", "Sonraki problem alınamadı: " + e.getMessage())
            );
        }
    }

    @GetMapping("/players/{gameId}")
    public ResponseEntity<?> getGamePlayers(@PathVariable("gameId") String gameId) {
        List<Player> players = gamePlayerMap.get(gameId);
        if (players != null) {
            return ResponseEntity.ok().body(players);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/info/{gameId}")
    public ResponseEntity<?> updatePlayerScores(@PathVariable("gameId") String gameId, @RequestBody Map<String, Object> scoreUpdate) {
        System.out.println("updatePlayerScores çağrıldı - Game ID: " + gameId + ", Data: " + scoreUpdate);
        
        try {
            List<Player> players = gamePlayerMap.get(gameId);
            if (players == null) {
                System.out.println("HATA: " + gameId + " ID'li oyun bulunamadı");
                return ResponseEntity.notFound().build();
            }

            String country = (String) scoreUpdate.get("country");
            if (country == null) {
                System.out.println("HATA: Ülke adı belirtilmedi - GameID: " + gameId);
                return ResponseEntity.badRequest().body(Map.of("error", "Ülke adı belirtilmedi"));
            }

            int welfareEffect;
            int economyEffect;
            try {
                welfareEffect = Integer.parseInt(String.valueOf(scoreUpdate.get("welfareEffect")));
                economyEffect = Integer.parseInt(String.valueOf(scoreUpdate.get("econEffect")));
                System.out.println("Etki değerleri hesaplandı - WelfareEffect: " + welfareEffect + ", EconomyEffect: " + economyEffect);
            } catch (NumberFormatException e) {
                System.out.println("HATA: Sayısal değerler geçerli formatta değil - Values: " + scoreUpdate+e);
                return ResponseEntity.badRequest().body(Map.of("error", "Sayısal değerler geçerli formatta değil"));
            }

            boolean playerUpdated = false;
            for (Player player : players) {
                if (player.getCountryName().equals(country)) {
                    int oldWelfareScore = player.getWelfareScore();
                    int oldEconomyScore = player.getEconomyScore();
                    
                    player.setWelfareScore(oldWelfareScore + welfareEffect * 10);
                    player.setEconomyScore(oldEconomyScore + economyEffect * 10);
                    
                    System.out.println("Oyuncu skoru güncellendi - Ülke: " + country + 
                                      ", Refah: " + oldWelfareScore + " -> " + player.getWelfareScore() + 
                                      ", Ekonomi: " + oldEconomyScore + " -> " + player.getEconomyScore());
                    
                    playerUpdated = true;
                    break;
                }
            }

            if (!playerUpdated) {
                System.out.println("HATA: " + country + " ülkesi için oyuncu bulunamadı - GameID: " + gameId);
                return ResponseEntity.notFound().build();
            }

            System.out.println("İşlem başarılı - Game ID: " + gameId + ", Ülke: " + country);
            return ResponseEntity.ok(Map.of("success", true, "message", "Oyuncu skorları güncellendi"));
        } catch (Exception e) {
            System.out.println("HATA: İşlem sırasında beklenmeyen hata - " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/info/{gameId}")
    public ResponseEntity<?> getGameInfo(@PathVariable("gameId") String gameId) {
        try {
            System.out.println("getGameInfo çağrıldı - gameId: " + gameId);

            List<Player> players = gamePlayerMap.get(gameId);

            if (players == null) {
                System.out.println("HATA: " + gameId + " için oyuncu listesi bulunamadı!");
                return ResponseEntity.notFound().build();
            }

            Map<String, Object> gameInfo = new HashMap<>();
            Map<String, Integer> econScores = new HashMap<>();
            Map<String, Integer> welfareScores = new HashMap<>();
            Map<String, String> policies = new HashMap<>();

            for (Player player : players) {
                econScores.put(player.getCountryName(), player.getEconomyScore());
                welfareScores.put(player.getCountryName(), player.getWelfareScore());
                policies.put(player.getCountryName(), player.getPolicy());
            }

            gameInfo.put("gameId", gameId);
            gameInfo.put("econScores", econScores);
            gameInfo.put("welfareScores", welfareScores);
            gameInfo.put("policies", policies);

            return ResponseEntity.ok(gameInfo);
        } catch (Exception e) {
            System.out.println("HATA: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}