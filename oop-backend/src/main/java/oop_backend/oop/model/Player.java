package oop_backend.oop.model;

public class Player {
    private Long userId;
    private String countryName;
    private int rating;
    private String policy;
    
    // Yapıcılar
    public Player() {
        this.rating = 0; // Başlangıç değeri
    }
    
    public Player(Long userId, String countryName) {
        this.userId = userId;
        this.countryName = countryName;
        this.rating = 0; // Başlangıç değeri
    }
    
    // Getter ve setter metodları
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
    
    public int getRating() {
        return rating;
    }
    
    public void setRating(int rating) {
        this.rating = rating;
    }
    
    public String getPolicy() {
        return policy;
    }
    
    public void setPolicy(String policy) {
        this.policy = policy;
    }
}