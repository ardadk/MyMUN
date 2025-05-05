package oop_backend.oop.service;

import java.util.List;
import oop_backend.oop.model.GameStartRequest.PlayerData;
import oop_backend.oop.model.WorldProblem;

public interface GameService {
    /**
     * Oyunu başlatır
     * @param players Oyuncu verileri listesi
     */
    void startGame(List<PlayerData> players);
    
    /**
     * Belirli bir oyun için mevcut problemi döndürür
     * @param gameId Oyun ID'si
     * @return İlgili dünya problemi
     */
    WorldProblem getCurrentProblem(String gameId);
}