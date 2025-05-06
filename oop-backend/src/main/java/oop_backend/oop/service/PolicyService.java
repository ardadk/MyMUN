package oop_backend.oop.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class PolicyService {
    
    private final Map<String, String> policies;
    private final Random random = new Random();
    
    public PolicyService() {
        policies = new HashMap<>();
        initializePolicies();
    }
    
    private void initializePolicies() {
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
    
    public String getRandomPolicy() {
        // Random bir politika seçip döndür
        String[] keys = policies.keySet().toArray(new String[0]);
        String randomKey = keys[random.nextInt(keys.length)];
        return policies.get(randomKey);
    }
    
    public Map<String, String> getAllPolicies() {
        return new HashMap<>(policies);
    }
}