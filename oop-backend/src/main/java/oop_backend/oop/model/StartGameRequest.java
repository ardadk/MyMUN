package oop_backend.oop.model;

import java.util.List;

public class StartGameRequest {
    private List<PlayerRequest> players;
    
    public List<PlayerRequest> getPlayers() {
        return players;
    }
    
    public void setPlayers(List<PlayerRequest> players) {
        this.players = players;
    }
    
    // İç sınıf: Front-end'den gelen basit oyuncu verisi
    public static class PlayerRequest {
        private Long userId;
        private String countryName;
        
        public Long getUserId() {
            return userId;
        }
        
        public void setUserId(Long userId) {
            this.userId = userId;
        }
        
        public String getCountryName() {
            return countryName;
        }
        
        public void setCountryName(String countryName) {
            this.countryName = countryName;
        }
    }
}