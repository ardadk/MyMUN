package oop_backend.oop.service;

import oop_backend.oop.model.WorldProblem;
import oop_backend.oop.model.ProblemOption;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProblemServiceImpl implements ProblemService {
    
    private final List<WorldProblem> problems;
    private final Map<String, List<ProblemOption>> optionsByStep;
    private Random random;
    
    public ProblemServiceImpl() {
        this.problems = initializeProblems();
        this.optionsByStep = initializeOptions();
        this.random = new Random();
    }
    
    @Override
    public WorldProblem selectRandomProblem() {
        if (problems.isEmpty()) {
            throw new IllegalStateException("Hiçbir dünya problemi tanımlanmamış!");
        }
        
        int randomIndex = random.nextInt(problems.size());
        WorldProblem selectedProblem = problems.get(randomIndex);
        
        // Seçilen problem bilgisi log'a yazılıyor
        System.out.println("Rastgele seçilen problem: " + selectedProblem.getDescription() + 
                " (ID: " + selectedProblem.getId() + ")");
        
        if (selectedProblem.getOptions() == null || selectedProblem.getOptions().isEmpty()) {
            System.out.println("UYARI: Bu problemin seçenekleri yok!");
        } else {
            System.out.println("Bu problemin " + selectedProblem.getOptions().size() + " seçeneği var:");
            for (ProblemOption option : selectedProblem.getOptions()) {
                System.out.println(" - " + option.getText() + " (ID: " + option.getId() + ")");
            }
        }
        
        return selectedProblem;
    }
    
    @Override
    public Optional<WorldProblem> getProblem(String id) {
        return problems.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
    }
    
    @Override
    public List<WorldProblem> getAllProblems() {
        return new ArrayList<>(problems);
    }
    
    @Override
    public List<ProblemOption> getOptionsForStep(String step) {
        try {
            System.out.println("İstenen adım için seçenekler alınıyor: " + step);
            
            // step null ise veya boşsa varsayılan olarak "start" adımını kullan
            if (step == null || step.trim().isEmpty()) {
                System.out.println("Boş adım isteği, varsayılan 'start' adımı kullanılacak");
                step = "start";
            }
            
            List<ProblemOption> options = optionsByStep.get(step);
            
            if (options == null || options.isEmpty()) {
                System.out.println("UYARI: '" + step + "' adımı için seçenek bulunamadı! Varsayılan seçenekler döndürülüyor.");
                
                // Adım bulunamadıysa varsayılan "end" seçeneği döndür
                List<ProblemOption> defaultOptions = new ArrayList<>();
                defaultOptions.add(new ProblemOption(
                    "default_end",
                    "Sonraki tura geç",
                    "start",
                    0,
                    0
                ));
                return defaultOptions;
            }
            
            System.out.println("'" + step + "' adımı için " + options.size() + " seçenek bulundu");
            return options;
        } catch (Exception e) {
            System.err.println("Adım seçeneklerini alırken hata: " + e.getMessage());
            e.printStackTrace();
            
            // Hata durumunda boş liste yerine varsayılan seçenekler döndür
            List<ProblemOption> fallbackOptions = new ArrayList<>();
            fallbackOptions.add(new ProblemOption(
                "error_fallback",
                "Hata oluştu, sonraki tura geç",
                "start",
                0,
                0
            ));
            return fallbackOptions;
        }
    }
    
    // Problemleri başlangıç değerleriyle doldur
    private List<WorldProblem> initializeProblems() {
        List<WorldProblem> problemList = new ArrayList<>();
        
        // Su krizi problemi
        List<ProblemOption> waterOptions = new ArrayList<>();
        waterOptions.add(new ProblemOption("w1", "Ülkende su tüketimi tasarrufu kanunu çıkar", "water_save", 0, 2));
        waterOptions.add(new ProblemOption("w2", "Dış ülkelerden su ithal et", "water_import", -2, 3));
        waterOptions.add(new ProblemOption("w3", "Dış ülkelere su sat", "water_export", 3, -1));
        
        problemList.add(new WorldProblem("water_crisis", "Dünya'da su krizi yaşanıyor.", waterOptions));
        
        // Küresel ısınma problemi
        List<ProblemOption> climateOptions = new ArrayList<>();
        climateOptions.add(new ProblemOption("c1", "Karbon emisyonlarını azaltacak yasalar çıkar", "climate_laws", -1, 2));
        climateOptions.add(new ProblemOption("c2", "Yeşil enerji teknolojilerine yatırım yap", "green_tech", 1, 1));
        climateOptions.add(new ProblemOption("c3", "Uluslararası iklim anlaşmalarından çekil", "climate_withdraw", 2, -2));
        
        problemList.add(new WorldProblem("climate_change", "Küresel ısınma kritik seviyelere ulaştı.", climateOptions));
        
        // Ekonomik kriz problemi
        List<ProblemOption> economyOptions = new ArrayList<>();
        economyOptions.add(new ProblemOption("e1", "Kemer sıkma politikaları uygula", "austerity", 2, -1));
        economyOptions.add(new ProblemOption("e2", "Dış borç al", "foreign_debt", 3, 1));
        economyOptions.add(new ProblemOption("e3", "Ekonomik teşvik paketleri açıkla", "stimulus", -2, 3));
        
        problemList.add(new WorldProblem("economic_crisis", "Dünya çapında bir ekonomik kriz başladı.", economyOptions));
        
        return problemList;
    }
    
    // Adım bazlı seçenekleri doldur
    private Map<String, List<ProblemOption>> initializeOptions() {
        Map<String, List<ProblemOption>> options = new HashMap<>();
        
        // Su krizi sonraki adımları
        List<ProblemOption> waterSave = new ArrayList<>();
        waterSave.add(new ProblemOption("ws1", "Su dağıtımını devlet kontrolüne al", "water_end", 1, 2));
        waterSave.add(new ProblemOption("ws2", "Özel sektörü su tasarrufu için teşvik et", "water_end", 2, 1));
        options.put("water_save", waterSave);
        
        List<ProblemOption> waterImport = new ArrayList<>();
        waterImport.add(new ProblemOption("wi1", "Komşu ülkelerle uzun vadeli su anlaşmaları imzala", "water_end", 2, 2));
        waterImport.add(new ProblemOption("wi2", "Su ithalini geçici bir çözüm olarak gör ve alternatif yöntemler araştır", "water_end", 0, 1));
        options.put("water_import", waterImport);
        
        List<ProblemOption> waterExport = new ArrayList<>();
        waterExport.add(new ProblemOption("we1", "Su kaynaklarını stratejik bir varlık olarak koruma altına al", "water_end", 1, 1));
        waterExport.add(new ProblemOption("we2", "Su satışından elde edilen geliri altyapı yatırımlarına yönlendir", "water_end", 3, 0));
        options.put("water_export", waterExport);
        
        // water_end için de seçenekler ekle (bu adım eksikti)
        List<ProblemOption> waterEnd = new ArrayList<>();
        waterEnd.add(new ProblemOption("wend1", "Sonraki tura geç", "start", 0, 0));
        options.put("water_end", waterEnd);
        
        // Diğer adımlar için seçenekler...
        
        // Son adım seçenekleri için sonlandırma bildirimi
        List<ProblemOption> endOptions = new ArrayList<>();
        endOptions.add(new ProblemOption("end1", "Sonraki tura geç", "start", 0, 0));
        
        // Tüm end adımları için varsayılan seçenekleri ekle
        options.put("climate_end", endOptions);
        options.put("economy_end", endOptions);
        options.put("pandemic_end", endOptions);
        options.put("cyber_end", endOptions);
        
        return options;
    }
}