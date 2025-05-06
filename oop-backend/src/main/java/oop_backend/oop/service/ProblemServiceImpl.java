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
        System.out.println("optionsByStep içeriği: " + optionsByStep);
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
        System.out.println("Alınan step: " + step);
        List<ProblemOption> options = optionsByStep.getOrDefault(step, Collections.emptyList());
        System.out.println("Dönen seçenekler: " + options);
        return options;
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
        
        // Küresel ısınma sonraki adımları
        List<ProblemOption> climateLaws = new ArrayList<>();
        climateLaws.add(new ProblemOption("cl1", "Karbon emisyonlarını azaltmaya devam et", "climate_end", -1, 2));
        climateLaws.add(new ProblemOption("cl2", "Yeşil enerji projelerini hızlandır", "climate_end", 2, 1));
        options.put("climate_laws", climateLaws);

        List<ProblemOption> greenTech = new ArrayList<>();
        greenTech.add(new ProblemOption("gt1", "Yeşil enerji projelerine daha fazla yatırım yap", "green_end", 2, 2));
        greenTech.add(new ProblemOption("gt2", "Yeşil enerji projelerini durdur ve fosil yakıtlara dön", "green_end", -2, -2));
        options.put("green_tech", greenTech);
        
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