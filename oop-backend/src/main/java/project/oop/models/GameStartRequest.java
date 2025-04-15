package project.oop.models;

import java.util.List;

public class GameStartRequest {
    private int playerCount;
    private List<startModel> selectedCountries;

    public GameStartRequest() {
    }

    public GameStartRequest(int playerCount, List<startModel> selectedCountries) {
        this.playerCount = playerCount;
        this.selectedCountries = selectedCountries;
    }

    public int getPlayerCount() {
        return playerCount;
    }

    public void setPlayerCount(int playerCount) {
        this.playerCount = playerCount;
    }

    public List<startModel> getSelectedCountries() {
        return selectedCountries;
    }

    public void setSelectedCountries(List<startModel> selectedCountries) {
        this.selectedCountries = selectedCountries;
    }
}