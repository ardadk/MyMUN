package oop_backend.oop.service;

import oop_backend.oop.model.WorldProblem;
import oop_backend.oop.model.ProblemOption;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProblemServiceImpl implements ProblemService {
    
    private final List<WorldProblem> problems;
    private Random random;
  
    
    public ProblemServiceImpl() {
        this.random = new Random();
        this.problems = initializeProblems();
    }
    
    @Override
    public WorldProblem selectRandomProblem() {
        if (problems.isEmpty()) {
            throw new IllegalStateException("Hiçbir dünya problemi tanımlanmamış!");
        }
        
        int randomIndex = random.nextInt(problems.size());
        WorldProblem selectedProblem = problems.get(randomIndex);
        
        System.out.println("Seçilen problem: " + selectedProblem.getDescription());
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
    
    
    
    // Problemleri başlangıç değerleriyle doldur
    private List<WorldProblem> initializeProblems() {
        List<WorldProblem> problemList = new ArrayList<>();
        
        // Su krizi problemi
        List<ProblemOption> waterOptions = new ArrayList<>();
        waterOptions.add(new ProblemOption("w1", "Ülkende su tüketimi tasarrufu kanunu çıkar", 2));
        waterOptions.add(new ProblemOption("w2", "Dış ülkelerden su ithal et", -3));
        waterOptions.add(new ProblemOption("w3", "Dış ülkelere su sat", -1));
        problemList.add(new WorldProblem("water_crisis", "Dünya'da su krizi yaşanıyor.", waterOptions));
        
        // Küresel ısınma problemi
        List<ProblemOption> climateOptions = new ArrayList<>();
        climateOptions.add(new ProblemOption("c1", "Yenilenebilir enerji yatırımlarını artır", 2));
        climateOptions.add(new ProblemOption("c2", "Karbon vergisi getir", -1));
        climateOptions.add(new ProblemOption("c3", "Uluslararası anlaşmalara katıl", 0));
        problemList.add(new WorldProblem("climate_change", "Küresel ısınma kritik seviyelere ulaştı.", climateOptions));
        
        // Ekonomik kriz problemi
        List<ProblemOption> economyOptions = new ArrayList<>();
        economyOptions.add(new ProblemOption("e1", "Kemer sıkma politikaları uygula", -1));
        economyOptions.add(new ProblemOption("e2", "Dış borç al", 1));
        economyOptions.add(new ProblemOption("e3", "Ekonomik teşvik paketleri açıkla", 3));
        problemList.add(new WorldProblem("economic_crisis", "Dünya çapında bir ekonomik kriz başladı.", economyOptions));
        
        return problemList;
    }
    
    
    
}