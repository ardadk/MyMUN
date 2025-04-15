package project.oop.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import project.oop.models.GameStartRequest;
import project.oop.models.startModel;
import java.util.List;

@RestController
public class getStartInfos {

    @GetMapping("/api/country")
    public startModel getCountryData(@RequestParam int id, @RequestParam String countryName) {
        startModel model = new startModel(id, countryName);
        return model;
    }

    @PostMapping("/api/start-game")
    public String startGame(@RequestBody GameStartRequest request) {
        // Oyuncu sayısı ve seçilen ülkeleri işlemek için gerekli kodlar
        int playerCount = request.getPlayerCount();
        List<startModel> countries = request.getSelectedCountries();

        return "Oyun başlatıldı: " + playerCount + " oyuncu, " + countries.size() + " ülke seçildi";
    }
}