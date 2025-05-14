package oop_backend.oop.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Random;
import java.util.Set;

@Service
public class PolicyService {
    
    private final Map<String, String> policies;
    private final Random random = new Random();
    private Set<String> assignedPolicyKeys = new HashSet<>();
    
    public PolicyService() {
        policies = new HashMap<>();
        initializePolicies();
    }
    
    private void initializePolicies() {
        policies.put("A", "Sağcı bir politikanız var. Devlet halkın önündedir.");
        policies.put("B", "Açık kapı politikası uyguluyorsunuz. Çok uluslu bir devletsiniz.");
        policies.put("C", "Dış politika konusunda pasifsiniz. Sakin bir yönetiminiz var.");
        policies.put("D", "Saldırgan dış politika. Komşularla gerilim yüksek.");
        policies.put("E", "Tarafsızlık ilkesini benimsiyorsunuz. Barışçıl bir ülkesiniz.");
        policies.put("F", "İhracatını arttırmaya çalışan bir ülkesiniz. Üretim odaklısınız.");
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
    
    public String getUniqueRandomPolicy() {
        if (assignedPolicyKeys.size() >= policies.size()) {
            // Tüm politikalar kullanılmışsa reset yap veya hata döndür
            return "Benzersiz politika kalmadı";
        }
        
        String[] keys = policies.keySet().toArray(new String[0]);
        String randomKey;
        
        // Daha önce atanmamış bir politika bulana kadar devam et
        do {
            randomKey = keys[random.nextInt(keys.length)];
        } while (assignedPolicyKeys.contains(randomKey));
        
        // Seçilen politikayı "kullanılmış" olarak işaretle
        assignedPolicyKeys.add(randomKey);
        return policies.get(randomKey);
    }
    
    public Map<String, String> getAllPolicies() {
        return new HashMap<>(policies);
    }
}