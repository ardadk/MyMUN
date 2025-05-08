package oop_backend.oop.model;

public class Player {
    private Long userId;
    private String countryName;
    private int rating;
    private String policy;
    private int economyScore; // Yeni ekonomi skoru alanı
    private int welfareScore; // Yeni refah skoru alanı
    
    // Yapıcılar
    public Player() {
        this.rating = 0; // Başlangıç değeri
        this.economyScore = 31; // Başlangıç değeri
        this.welfareScore = 40; // Başlangıç değeri
    }
    
    public Player(Long userId, String countryName) {
        this.userId = userId;
        this.countryName = countryName;
        this.rating = 0; // Başlangıç değeri
        this.economyScore = 31; // Başlangıç değeri
        this.welfareScore = 50; // Başlangıç değeri
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
    
    public int getEconomyScore() {
        return economyScore;
    }
    
    public void setEconomyScore(int economyScore) {
        // Sınırları kontrol et (0-100 arası)
        this.economyScore = Math.max(0, Math.min(100, economyScore));
    }
    
    public int getWelfareScore() {
        return welfareScore;
    }
    
    public void setWelfareScore(int welfareScore) {
        // Sınırları kontrol et (0-100 arası)
        this.welfareScore = Math.max(0, Math.min(100, welfareScore));
    }
}
