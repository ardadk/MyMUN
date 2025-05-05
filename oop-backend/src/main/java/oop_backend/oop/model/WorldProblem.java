package oop_backend.oop.model;

import java.util.List;

public class WorldProblem {
    private String id;
    private String description;
    private List<ProblemOption> options;
    
    public WorldProblem() {}
    
    public WorldProblem(String id, String description, List<ProblemOption> options) {
        this.id = id;
        this.description = description;
        this.options = options;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public List<ProblemOption> getOptions() {
        return options;
    }
    
    public void setOptions(List<ProblemOption> options) {
        this.options = options;
    }
}