package oop_backend.oop.model;

public class Player {
    private String playerId;
    private String countryName;
    
    public Player() {
        // Boş yapıcı (Jackson için)
    }
    
    public Player(String playerId, String countryName) {
        this.playerId = playerId;
        this.countryName = countryName;
    }
    
    // Getter ve setter metodları
    public String getPlayerId() {
        return playerId;
    }
    
    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }
    
    public String getCountryName() {
        return countryName;
    }
    
    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }
}