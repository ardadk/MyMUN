package oop_backend.oop.model;

import java.util.List;

public class GameStartRequest {
    private List<PlayerData> players;

    public List<PlayerData> getPlayers() {
        return players;
    }

    public void setPlayers(List<PlayerData> players) {
        this.players = players;
    }

    // İç sınıf olarak PlayerData tanımlıyoruz
    public static class PlayerData {
        private Long playerId;
        private String countryName;

        public Long getPlayerId() {
            return playerId;
        }

        public void setPlayerId(Long playerId) {
            this.playerId = playerId;
        }

        public String getCountryName() {
            return countryName;
        }

        public void setCountryName(String countryName) {
            this.countryName = countryName;
        }
    }
}