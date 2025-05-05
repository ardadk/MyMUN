package oop_backend.oop.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import oop_backend.oop.model.GameStartRequest.PlayerData;
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
    public void startGame(List<PlayerData> players) {
        logger.info("Oyun başlatılıyor... {} oyuncu ile", players.size());
        
        // Rastgele bir dünya problemi seç
        WorldProblem problem = problemService.selectRandomProblem();
        String gameId = generateGameId();
        activeGames.put(gameId, problem);
        
        System.out.println("\n✅ YENİ OYUN BAŞLATILDI ✅");
        System.out.println("------------------------");
        System.out.println("🌍 Dünya Problemi: " + problem.getDescription());
        System.out.println("------------------------");
        
        for (PlayerData player : players) {
            System.out.println("👤 Oyuncu ID: " + player.getPlayerId() + " | 🌍 Ülke: " + player.getCountryName());
        }
        
        System.out.println("------------------------\n");
    }
    
    @Override
    public WorldProblem getCurrentProblem(String gameId) {
        return activeGames.get(gameId);
    }
    
    private String generateGameId() {
        return "game_" + System.currentTimeMillis();
    }
}