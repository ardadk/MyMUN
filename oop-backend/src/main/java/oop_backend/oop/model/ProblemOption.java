package oop_backend.oop.model;

public class ProblemOption {
    private String id;
    private String text;
    private String next;
    private int economyEffect;
    private int welfareEffect;
    
    public ProblemOption() {}
    
    public ProblemOption(String id, String text, String next, int economyEffect, int welfareEffect) {
        this.id = id;
        this.text = text;
        this.next = next;
        this.economyEffect = economyEffect;
        this.welfareEffect = welfareEffect;
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
    
    public String getNext() {
        return next;
    }
    
    public void setNext(String next) {
        this.next = next;
    }
    
    public int getEconomyEffect() {
        return economyEffect;
    }
    
    public void setEconomyEffect(int economyEffect) {
        this.economyEffect = economyEffect;
    }
    
    public int getWelfareEffect() {
        return welfareEffect;
    }
    
    public void setWelfareEffect(int welfareEffect) {
        this.welfareEffect = welfareEffect;
    }
}