package oop_backend.oop.model;
public class ProblemOption {
    private String id;
    private String text;
    private int economyEffect;
    private int welfareEffect;
    
    public ProblemOption() {}
    
    public ProblemOption(String id, String text, int welfareEffect, int economyEffect) {
        this.id = id;
        this.text = text;
        this.welfareEffect = welfareEffect;
        this.economyEffect = economyEffect;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getText() {
        return text;
    }
    
    public void setText(String text) {
        this.text = text;
    }
    
    public int getWelfareEffect() {
        return welfareEffect;
    }
    
    public void setWelfareEffect(int welfareEffect) {
        this.welfareEffect = welfareEffect;
    }

    public int getEconomyEffect() {
        return economyEffect;
    }

    public void setEconomyEffect(int economyEffect) {
        this.economyEffect = economyEffect;
    }

}