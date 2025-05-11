package oop_backend.oop.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import oop_backend.oop.model.Player;
import oop_backend.oop.model.WorldProblem;

@Service
public class GameServiceImpl implements GameService {
    
    private static final Logger logger = LoggerFactory.getLogger(GameServiceImpl.class);
    
    private final ProblemService problemService;
    private Map<String, WorldProblem> activeGames = new HashMap<>();
    
    @Autowired
    public GameServiceImpl(ProblemService problemService) {
        this.problemService = problemService;
    }
    
    @Override
    public String startGame(List<Player> players) {
        logger.info("Oyun başlatılıyor... {} oyuncu ile", players.size());
        
        // Rastgele bir dünya problemi seç
        WorldProblem problem = problemService.selectRandomProblem();
        String gameId = generateGameId();
        activeGames.put(gameId, problem);
        
        System.out.println("\n✅ YENİ OYUN BAŞLATILDI ✅");
        System.out.println("------------------------");
        System.out.println("------------------------");
        
        for (Player player : players) {
            System.out.println("👤 Oyuncu ID: " + player.getUserId() + 
                              " | 🌍 Ülke: " + player.getCountryName() + 
                              " | 📜 Politika: " + player.getPolicy());
        }
        
        System.out.println("------------------------\n");
        
        return gameId;
    }
    
    @Override
    public WorldProblem getCurrentProblem(String gameId) {
        return activeGames.get(gameId);
    }
    
    /**
     * Belirli bir oyun için problemi günceller
     * @param gameId Oyun ID'si
     * @param problem Yeni problem
     */
    @Override
    public void updateGameProblem(String gameId, WorldProblem problem) {
        if (problem == null) {
            logger.error("Güncellenmeye çalışılan problem null!");
            return;
        }
        
        // Önceki problemi kaydet
        WorldProblem previousProblem = activeGames.get(gameId);
        
        // Yeni problemi kaydet
        activeGames.put(gameId, problem);
        
        logger.info("Oyun ID {} için problem güncellendi", gameId);
        logger.info("Önceki problem: {}", previousProblem != null ? previousProblem.getDescription() : "Bulunmuyor");
        logger.info("Yeni problem: {}", problem.getDescription());
        
        System.out.println("\n🔄 PROBLEM DEĞİŞTİRİLDİ 🔄");
        System.out.println("------------------------");
        System.out.println("🌍 Yeni Dünya Problemi: " + problem.getDescription());
        System.out.println("🔢 Seçenek Sayısı: " + (problem.getOptions() != null ? problem.getOptions().size() : 0));
        System.out.println("------------------------");
    }
    
    private String generateGameId() {
        return "game_" + System.currentTimeMillis();
    }
}