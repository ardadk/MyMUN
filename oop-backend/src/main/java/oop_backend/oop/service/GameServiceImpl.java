package oop_backend.oop.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.List;
import oop_backend.oop.model.GameStartRequest.PlayerData;

@Service
public class GameServiceImpl implements GameService {
    
    private static final Logger logger = LoggerFactory.getLogger(GameServiceImpl.class);
    
    @Override
    public void startGame(List<PlayerData> players) {
        logger.info("Oyun başlatılıyor... {} oyuncu ile", players.size());
        
        System.out.println("\n✅ YENİ OYUN BAŞLATILDI ✅");
        System.out.println("------------------------");
        
        for (PlayerData player : players) {
            System.out.println("👤 Oyuncu ID: " + player.getPlayerId() + " | 🌍 Ülke: " + player.getCountryName());
        }
        
        System.out.println("------------------------\n");
    }
}