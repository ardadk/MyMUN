package oop_backend.oop.model;

import java.util.ArrayList;
import java.util.List;

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

    // Problemleri başlangıç değerleriyle doldur
    private List<WorldProblem> initializeProblems() {
        List<WorldProblem> problemList = new ArrayList<>();
        
        // Su krizi problemi
        List<ProblemOption> waterOptions = new ArrayList<>();
        waterOptions.add(new ProblemOption("w1", "Ülkende su tüketimi tasarrufu kanunu çıkar", 2, -1));
        waterOptions.add(new ProblemOption("w2", "Dış ülkelerden su ithal et", -3, -2));
        waterOptions.add(new ProblemOption("w3", "Dış ülkelere su sat", -1, 3));
        problemList.add(new WorldProblem("water_crisis", "Dünya'da su krizi yaşanıyor.", waterOptions));
        
        // Küresel ısınma problemi
        List<ProblemOption> climateOptions = new ArrayList<>();
        climateOptions.add(new ProblemOption("c1", "Yenilenebilir enerji yatırımlarını artır", 2, -2));
        climateOptions.add(new ProblemOption("c2", "Karbon vergisi getir", -1, 1));
        climateOptions.add(new ProblemOption("c3", "Uluslararası anlaşmalara katıl", 0, -1));
        problemList.add(new WorldProblem("climate_change", "Küresel ısınma kritik seviyelere ulaştı.", climateOptions));
        
        // Ekonomik kriz problemi
        List<ProblemOption> economyOptions = new ArrayList<>();
        economyOptions.add(new ProblemOption("e1", "Kemer sıkma politikaları uygula", -1, 2));
        economyOptions.add(new ProblemOption("e2", "Dış borç al", 1, -3));
        economyOptions.add(new ProblemOption("e3", "Ekonomik teşvik paketleri açıkla", 3, -2));
        problemList.add(new WorldProblem("economic_crisis", "Dünya çapında bir ekonomik kriz başladı.", economyOptions));
        
        return problemList;
    }
}