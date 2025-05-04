package oop_backend.oop.model;

import java.util.List;
import java.util.UUID;

public class Game {
    private String gameId;
    private List<Player> players;
    private long startTime;
    
    public Game(List<Player> players) {
        this.gameId = UUID.randomUUID().toString();
        this.players = players;
        this.startTime = System.currentTimeMillis();
    }
    
    // Getter ve setter metodları
    public String getGameId() {
        return gameId;
    }
    
    public List<Player> getPlayers() {
        return players;
    }
    
    public long getStartTime() {
        return startTime;
    }
}