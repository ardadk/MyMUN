package oop_backend.oop.service;

import java.util.List;
import oop_backend.oop.model.GameStartRequest.PlayerData;

public interface GameService {
    void startGame(List<PlayerData> players);
}