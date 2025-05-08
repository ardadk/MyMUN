package oop_backend.oop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import oop_backend.oop.model.StartGameRequest;
import oop_backend.oop.model.Player;
import oop_backend.oop.model.WorldProblem;
import oop_backend.oop.model.ProblemOption;
import oop_backend.oop.service.GameService;
import oop_backend.oop.service.ProblemService;
import oop_backend.oop.service.PolicyService;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://localhost:5173") // Sadece frontend URL'sine izin ver
public class GameController {

    private final GameService gameService;
    private final ProblemService problemService;
    private final PolicyService policyService;
    private Map<String, List<Player>> gamePlayerMap = new HashMap<>();
    private int counter = 1; // Counter değişkeni tanımlandı

    public GameController(GameService gameService, ProblemService problemService, PolicyService policyService) {
        this.gameService = gameService;
        this.problemService = problemService;
        this.policyService = policyService;
    }

    @PostMapping("/start")
    public ResponseEntity<?> startGame(@RequestBody StartGameRequest request) {
        try {
            // Burada bir test logu ekleyelim
            System.out.println("Oyun başlatma isteği: " + request);
            
            // Rastgele bir problem seç
            WorldProblem selectedProblem = problemService.selectRandomProblem();
            System.out.println("Seçilen problem: " + selectedProblem);
            
            // Başlangıç seçeneklerini al
            List<ProblemOption> initialOptions = problemService.getOptionsForStep("start");
            System.out.println("Başlangıç seçenekleri: " + initialOptions);
            
            if (initialOptions == null || initialOptions.isEmpty()) {
                // Eğer başlangıç seçenekleri yoksa, varsayılan seçenekler ekle
                initialOptions = new ArrayList<>();
                ProblemOption defaultOption = new ProblemOption();
                defaultOption.setId("default");
                defaultOption.setText("Önlem al");
                defaultOption.setNext("action_step");
                defaultOption.setWelfareEffect(0);
                initialOptions.add(defaultOption);
            }
            
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
            gameData.put("options", initialOptions);
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
    
    @GetMapping("/options/{step}")
    public ResponseEntity<?> getOptionsForStep(@PathVariable("step") String step) {
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
                0
            ));
            
            // Hata durumunda varsayılan seçenekleri döndür, 500 hatası yerine
            return ResponseEntity.ok(fallbackOptions);
        }
    }
    
    @GetMapping("/problem/{gameId}")
    public ResponseEntity<?> getCurrentProblem(@PathVariable("gameId") String gameId) {
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
    public ResponseEntity<?> getNextProblem(@PathVariable("gameId") String gameId) {
        try {
            // Counter'ı artır
            counter++;
            System.out.println("Counter değeri: " + counter);

            // Counter 3 olduğunda kullanıcıyı game-over URL'sine yönlendir
            if (counter == 3) {
                return ResponseEntity.status(302) // 302 Found (Redirect)
                        .header("Location", "/game-over")
                        .build();
            }

            // Bir önceki problemden farklı yeni bir problem seç
            WorldProblem currentProblem = gameService.getCurrentProblem(gameId);
            WorldProblem newProblem = null;

            // Tüm problemleri al
            List<WorldProblem> allProblems = problemService.getAllProblems();

            if (allProblems.size() > 1 && currentProblem != null) {
                List<WorldProblem> otherProblems = allProblems.stream()
                        .filter(p -> !p.getId().equals(currentProblem.getId()))
                        .collect(Collectors.toList());

                if (!otherProblems.isEmpty()) {
                    int randomIndex = new Random().nextInt(otherProblems.size());
                    newProblem = otherProblems.get(randomIndex);
                }
            } else {
                newProblem = problemService.selectRandomProblem();
            }

            if (newProblem == null) {
                return ResponseEntity.badRequest().body(
                        Map.of("success", false, "message", "Yeni problem seçilemedi")
                );
            }

            gameService.updateGameProblem(gameId, newProblem);

            return ResponseEntity.ok().body(newProblem);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(
                    Map.of("success", false, "message", "Sonraki problem alınamadı: " + e.getMessage())
            );
        }
    }

    @GetMapping("/game-over")
    @CrossOrigin(origins = "*") // Tüm kaynaklara izin ver
    public ResponseEntity<String> gameOver() {
        return ResponseEntity.ok("<h1>Game Over</h1>");
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
    
    // Oyunun skorlarını alma endpointi
    @GetMapping("/info/{gameId}")
    public ResponseEntity<?> getGameInfo(@PathVariable("gameId") String gameId) {
        try {
            System.out.println("getGameInfo çağrıldı - gameId: " + gameId);
            
            List<Player> players = gamePlayerMap.get(gameId);
            
            if (players == null) {
                System.out.println("HATA: " + gameId + " için oyuncu listesi bulunamadı!");
                return ResponseEntity.notFound().build();
            }
            
            System.out.println("Oyuncu sayısı: " + players.size());
            
            Map<String, Object> gameInfo = new HashMap<>();
            Map<String, Integer> econScores = new HashMap<>();
            Map<String, Integer> welfareScores = new HashMap<>();
            Map<String, String> policies = new HashMap<>();
            
            for (Player player : players) {
                econScores.put(player.getCountryName(), player.getEconomyScore());
                welfareScores.put(player.getCountryName(), player.getWelfareScore());
                policies.put(player.getCountryName(), player.getPolicy());
                
                System.out.println("Ülke: " + player.getCountryName() + 
                                 ", Ekonomi: " + player.getEconomyScore() + 
                                 ", Refah: " + player.getWelfareScore() +
                                 ", Politika: " + player.getPolicy());
            }
            
            gameInfo.put("gameId", gameId); // String gameId değerini kullan
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

    // Skorları güncelleme endpointi
    @PutMapping("/info/{gameId}")
    public ResponseEntity<?> updatePlayerScores(@PathVariable("gameId") String gameId, @RequestBody Map<String, Object> scoreUpdate) {
        try {
            List<Player> players = gamePlayerMap.get(gameId);
            if (players == null) {
                return ResponseEntity.notFound().build();
            }

            String country = (String) scoreUpdate.get("country");
            if (country == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Ülke adı belirtilmedi"));
            }

            // Sadece welfare effect için dönüşüm yap
            int welfareEffect;
            try {
                // economyEffect kodu silindi
                welfareEffect = Integer.parseInt(String.valueOf(scoreUpdate.get("welfareEffect")));
            } catch (NumberFormatException e) {
                System.out.println("HATA: Sayısal değerler geçerli formatta değil");
                return ResponseEntity.badRequest().body(Map.of("error", "Sayısal değerler geçerli formatta değil"));
            }

            boolean playerUpdated = false;
            for (Player player : players) {
                if (player.getCountryName().equals(country)) {
                    // Economy değeri değişmez, sadece welfare güncellenir
                    player.setWelfareScore(player.getWelfareScore() + welfareEffect * 10);
                    playerUpdated = true;
                    break;
                }
            }

            if (!playerUpdated) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(Map.of("success", true, "message", "Oyuncu refah skoru güncellendi"));
        } catch (Exception e) {
            System.out.println("HATA: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}