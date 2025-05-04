package oop_backend.oop.model;

import java.util.Map;
import java.util.List;

public class GameData {
    private String globalProblem;
    private Map<String, String> countryPolicies;
    private Map<String, Integer> econScores;
    private Map<String, Integer> welfareScores;
    private Map<String, List<ChatOption>> chatOptions;
    private Map<String, String> messageSteps;
    
    public GameData() {
    }

    public String getGlobalProblem() {
        return globalProblem;
    }

    public void setGlobalProblem(String globalProblem) {
        this.globalProblem = globalProblem;
    }

    public Map<String, String> getCountryPolicies() {
        return countryPolicies;
    }

    public void setCountryPolicies(Map<String, String> countryPolicies) {
        this.countryPolicies = countryPolicies;
    }

    public Map<String, Integer> getEconScores() {
        return econScores;
    }

    public void setEconScores(Map<String, Integer> econScores) {
        this.econScores = econScores;
    }

    public Map<String, Integer> getWelfareScores() {
        return welfareScores;
    }

    public void setWelfareScores(Map<String, Integer> welfareScores) {
        this.welfareScores = welfareScores;
    }

    public Map<String, List<ChatOption>> getChatOptions() {
        return chatOptions;
    }

    public void setChatOptions(Map<String, List<ChatOption>> chatOptions) {
        this.chatOptions = chatOptions;
    }

    public Map<String, String> getMessageSteps() {
        return messageSteps;
    }

    public void setMessageSteps(Map<String, String> messageSteps) {
        this.messageSteps = messageSteps;
    }
}