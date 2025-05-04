package oop_backend.oop.service;

import oop_backend.oop.model.Player;
import oop_backend.oop.model.GameData;
import oop_backend.oop.model.ChatOption;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class GameService {
    
    private List<Player> players = new ArrayList<>();
    private GameData currentGameData = new GameData();
    private Random random = new Random();
    
    // Policies verileri
    private final Map<String, String> policies = new HashMap<>();
    {
        policies.put("A", "Göçmenleri istemiyorsunuz. Sağcı bir politikanız var.");
        policies.put("B", "Açık kapı politikası uyguluyorsunuz. Mültecilere destek veriyorsunuz.");
        policies.put("C", "İzolasyonistsiniz. Dış politika konusunda pasifsiniz.");
        policies.put("D", "Saldırgan dış politika. Komşularla gerilim yüksek.");
        policies.put("E", "Tarafsızlık ilkesini benimsiyorsunuz. Barışçıl bir ülkesiniz.");
        policies.put("F", "Enerji bağımlılığını azaltmaya çalışan bir ülkesiniz.");
        policies.put("G", "Askeri yatırımları artıran milliyetçi bir politikanız var.");
        policies.put("H", "Çevreci politikaları benimsemiş bir yönetiminiz var.");
        policies.put("I", "Teknolojiye büyük yatırımlar yapan liberal bir devletsiniz.");
        policies.put("J", "Yolsuzlukla mücadeleye odaklanan şeffaflık temelli bir hükümetiniz var.");
    }
    
    // Problems verileri
    private final Map<String, String> problems = new HashMap<>();
    {
        problems.put("A", "3. dünya savaşı çıktı");
        problems.put("B", "Büyük bir ekonomik kriz yaşanıyor");
        problems.put("C", "İç savaş başladı");
        problems.put("D", "Küresel ısınma nedeniyle kıtlık var");
        problems.put("E", "Ülkenizde salgın hastalık yayılıyor");
        problems.put("F", "Darbe girişimi yaşandı");
        problems.put("G", "Enerji kaynakları tükendi");
        problems.put("H", "Ulusal internet ağı çöktü");
        problems.put("I", "Büyük çaplı doğal afet gerçekleşti");
        problems.put("J", "Ticaret ambargosu ile karşı karşıyasınız");
    }
    
    // Chat seçenekleri
    private final Map<String, Map<String, List<ChatOption>>> allChatOptions = new HashMap<>();
    {
        // Başlangıç seçenekleri
        Map<String, List<ChatOption>> startOptions = new HashMap<>();
        List<ChatOption> defaultStart = new ArrayList<>();
        defaultStart.add(new ChatOption("Savaşa girmeyeceğim", "peace"));
        defaultStart.add(new ChatOption("C ülkesini destekliyorum", "supportC"));
        defaultStart.add(new ChatOption("D ülkesini suçluyorum", "blameD"));
        startOptions.put("start", defaultStart);
        allChatOptions.put("default", startOptions);
        
        // 3. Dünya Savaşı seçenekleri
        Map<String, List<ChatOption>> warOptions = new HashMap<>();
        
        List<ChatOption> warRound1 = new ArrayList<>();
        warRound1.add(new ChatOption("Savaşı durdurmak için çağrı yapıyorum", "peaceCall"));
        warRound1.add(new ChatOption("Müttefik arıyorum", "seekAllies"));
        warRound1.add(new ChatOption("Savunma bütçemi artırıyorum", "defenseBoost"));
        warOptions.put("start", warRound1);
        
        List<ChatOption> warRound2 = new ArrayList<>();
        warRound2.add(new ChatOption("Barış görüşmeleri düzenleyelim", "summitCall"));
        warRound2.add(new ChatOption("Sivil kayıplar endişe verici", "civilianConcern"));
        warRound2.add(new ChatOption("Savaş suçlarını kınıyorum", "warCrime"));
        warOptions.put("peaceCall", warRound2);
        warOptions.put("seekAllies", warRound2);
        warOptions.put("defenseBoost", warRound2);
        
        allChatOptions.put("3. dünya savaşı çıktı", warOptions);
        
        // Ekonomik Kriz seçenekleri
        Map<String, List<ChatOption>> crisisOptions = new HashMap<>();
        
        List<ChatOption> crisisRound1 = new ArrayList<>();
        crisisRound1.add(new ChatOption("Uluslararası yardım talep ediyorum", "aidRequest"));
        crisisRound1.add(new ChatOption("Ekonomik reform planı açıklıyorum", "reformPlan"));
        crisisRound1.add(new ChatOption("İstikrar fonu oluşturulmalı", "stabilityFund"));
        crisisOptions.put("start", crisisRound1);
        
        List<ChatOption> crisisRound2 = new ArrayList<>();
        crisisRound2.add(new ChatOption("Vergileri yeniden düzenliyoruz", "taxAdjust"));
        crisisRound2.add(new ChatOption("İstihdam paketini devreye sokuyoruz", "jobsPlan"));
        crisisRound2.add(new ChatOption("Yatırımcı güvenini artırmak istiyoruz", "investorAppeal"));
        crisisOptions.put("aidRequest", crisisRound2);
        crisisOptions.put("reformPlan", crisisRound2);
        crisisOptions.put("stabilityFund", crisisRound2);
        
        allChatOptions.put("Büyük bir ekonomik kriz yaşanıyor", crisisOptions);
        
        // Diğer problemler için de benzer şekilde eklenebilir...
    }
    
    public void initializeGame(List<Map<String, Object>> playerData) {
        System.out.println("initializeGame çağrıldı, " + playerData.size() + " oyuncu verisi alındı");
        
        // Önceki oyuncuları temizle
        players.clear();
        
        // Veriden oyuncular oluştur
        for (Map<String, Object> data : playerData) {
            String playerId = (String) data.get("playerId");
            String countryName = (String) data.get("countryName");
            
            System.out.println("Oyuncu oluşturuluyor: " + playerId + " - " + countryName);
            
            Player player = new Player(playerId, countryName);
            players.add(player);
        }
        
        // Oyun verilerini oluştur
        initializeGameData();
    }
    
    private void initializeGameData() {
        System.out.println("Oyun verileri oluşturuluyor");
        
        currentGameData = new GameData();
        List<String> countries = players.stream().map(Player::getCountryName).collect(Collectors.toList());
        
        // Random problem seç
        String randomProblem = getRandomProblem();
        currentGameData.setGlobalProblem(randomProblem);
        
        // Log ekleyin
        System.out.println("Seçilen global problem: " + randomProblem);
        
        // Her ülke için random politikalar ve skorlar oluştur
        Map<String, String> countryPolicies = new HashMap<>();
        Map<String, Integer> econScores = new HashMap<>();
        Map<String, Integer> welfareScores = new HashMap<>();
        Map<String, String> messageSteps = new HashMap<>();
        
        for (String country : countries) {
            countryPolicies.put(country, getRandomPolicy());
            econScores.put(country, getRandomScore());
            welfareScores.put(country, getRandomScore());
            messageSteps.put(country, "start");
        }
        
        currentGameData.setCountryPolicies(countryPolicies);
        currentGameData.setEconScores(econScores);
        currentGameData.setWelfareScores(welfareScores);
        currentGameData.setMessageSteps(messageSteps);
        
        // Probleme göre chat seçeneklerini hazırla
        Map<String, List<ChatOption>> problemSpecificOptions = getProblemSpecificChatOptions(randomProblem);
        currentGameData.setChatOptions(problemSpecificOptions);
        
        // Log ekleyin
        System.out.println("Ülke politikaları ve skorları oluşturuldu");
    }
    
    private String getRandomPolicy() {
        List<String> policyKeys = new ArrayList<>(policies.keySet());
        String randomKey = policyKeys.get(random.nextInt(policyKeys.size()));
        return policies.get(randomKey);
    }
    
    private String getRandomProblem() {
        List<String> problemValues = new ArrayList<>(problems.values());
        return problemValues.get(random.nextInt(problemValues.size()));
    }
    
    private int getRandomScore() {
        return random.nextInt(5) + 1; // 1-5 arası random değer
    }
    
    private Map<String, List<ChatOption>> getProblemSpecificChatOptions(String problem) {
        // Probleme özgü chat seçeneklerini döndür, yoksa default seçenekleri kullan
        return allChatOptions.getOrDefault(problem, allChatOptions.get("default"));
    }
    
    public List<Player> getPlayers() {
        return players;
    }
    
    public GameData getGameData() {
        return currentGameData;
    }
    
    public List<ChatOption> getChatOptionsForStep(String step) {
        // Adıma göre chat seçeneklerini döndür
        String problem = currentGameData.getGlobalProblem();
        Map<String, List<ChatOption>> problemOptions = allChatOptions.getOrDefault(problem, allChatOptions.get("default"));
        return problemOptions.getOrDefault(step, problemOptions.get("start"));
    }
    
    public Map<String, Object> getGameStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("totalPlayers", players.size());
        status.put("players", players);
        status.put("gameData", currentGameData);
        return status;
    }
}