package oop_backend.oop.service;

import java.util.List;
import oop_backend.oop.model.Player;
import oop_backend.oop.model.WorldProblem;

public interface GameService {
    /**
     * Oyunu başlatır
     * @param players Oyuncu verileri listesi
     * @return Oyun için benzersiz kimlik
     */
    String startGame(List<Player> players);
    
    /**
     * Belirli bir oyun için mevcut problemi döndürür
     * @param gameId Oyun ID'si
     * @return İlgili dünya problemi
     */
    WorldProblem getCurrentProblem(String gameId);
    
    /**
     * Belirli bir oyun için problemi günceller
     * @param gameId Oyun ID'si
     * @param problem Yeni problem
     */
    void updateGameProblem(String gameId, WorldProblem problem);
}