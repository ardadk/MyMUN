package oop_backend.oop.service;

import oop_backend.oop.model.Player;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Service
public class GameService {
    
    private List<Player> players = new ArrayList<>();
    
    public void initializeGame(List<Map<String, Object>> playerData) {
        // Önceki oyuncuları temizle
        players.clear();
        
        // Veriden oyuncular oluştur
        for (Map<String, Object> data : playerData) {
            int playerNumber = ((Number) data.get("playerNumber")).intValue();
            String country = (String) data.get("country");
            
            Player player = new Player(playerNumber, country);
            players.add(player);
        }
    }
    
    public List<Player> getPlayers() {
        return players;
    }
    
    public Map<String, Object> getGameStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("totalPlayers", players.size());
        status.put("players", players);
        return status;
    }
}