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
    // Problemleri başlangıç değerleriyle doldur
    private List<WorldProblem> initializeProblems() {
        List<WorldProblem> problemList = new ArrayList<>();
        
        // Su krizi problemi
        List<ProblemOption> waterOptions = new ArrayList<>();
        waterOptions.add(new ProblemOption("w1", "Ülkende su tüketimi tasarrufu kanunu çıkar", 2,0));
        waterOptions.add(new ProblemOption("w2", "Dış ülkelerden su ithal et", -3,4));
        waterOptions.add(new ProblemOption("w3", "Dış ülkelere su sat", -1,5));
        waterOptions.add(new ProblemOption("w4", "Su arıtma tesislerine yatırım yap", 3,-2));
        waterOptions.add(new ProblemOption("w5", "Yağmur suyu toplama sistemleri kur", 2,1));
        waterOptions.add(new ProblemOption("w6", "Su kullanımına ek vergi getir", -2,3));
        problemList.add(new WorldProblem("water_crisis", "Dünya'da su krizi yaşanıyor.", waterOptions));
        
        // Küresel ısınma problemi
        List<ProblemOption> climateOptions = new ArrayList<>();
        climateOptions.add(new ProblemOption("c1", "Yenilenebilir enerji yatırımlarını artır", 2,4));
        climateOptions.add(new ProblemOption("c2", "Karbon vergisi getir", -1,4));
        climateOptions.add(new ProblemOption("c3", "Uluslararası anlaşmalara katıl", 0,3));
        climateOptions.add(new ProblemOption("c4", "Ağaçlandırma projelerine yatırım yap", 3,-1));
        climateOptions.add(new ProblemOption("c5", "Fosil yakıt kullanımını yasakla", -3,-2));
        climateOptions.add(new ProblemOption("c6", "Elektrikli araç üretimini teşvik et", 2,-3));
        problemList.add(new WorldProblem("climate_change", "Küresel ısınma kritik seviyelere ulaştı.", climateOptions));
        
        // Ekonomik kriz problemi
        List<ProblemOption> economyOptions = new ArrayList<>();
        economyOptions.add(new ProblemOption("e1", "Kemer sıkma politikaları uygula", -1,4));
        economyOptions.add(new ProblemOption("e2", "Dış borç al", -4,5));
        economyOptions.add(new ProblemOption("e3", "Ekonomik teşvik paketleri açıkla", 3,2));
        economyOptions.add(new ProblemOption("e4", "Faiz oranlarını düşür", 2,-2));
        economyOptions.add(new ProblemOption("e5", "Vergileri artır", -3,3));
        economyOptions.add(new ProblemOption("e6", "İşsizlik yardımlarını artır", 3,-3));
        problemList.add(new WorldProblem("economic_crisis", "Dünya çapında bir ekonomik kriz başladı.", economyOptions));
        
        // Pandemi problemi
        List<ProblemOption> pandemicOptions = new ArrayList<>();
        pandemicOptions.add(new ProblemOption("p1", "Tam karantina uygula", 1,-3));
        pandemicOptions.add(new ProblemOption("p2", "Aşı geliştirme çalışmalarını finanse et", 3,-2));
        pandemicOptions.add(new ProblemOption("p3", "Sınırları tamamen kapat", -2,-4));
        pandemicOptions.add(new ProblemOption("p4", "Sağlık sistemine yatırım yap", 3,-3));
        pandemicOptions.add(new ProblemOption("p5", "Sosyal mesafe kurallarını gevşet", -3,2));
        pandemicOptions.add(new ProblemOption("p6", "Dijital sağlık izleme sistemleri kur", 1,-1));
        problemList.add(new WorldProblem("pandemic", "Dünya çapında ölümcül bir salgın hastalık yayılıyor.", pandemicOptions));
        
        // Gıda güvenliği krizi problemi
        List<ProblemOption> foodOptions = new ArrayList<>();
        foodOptions.add(new ProblemOption("f1", "Tarım sübvansiyonlarını artır", 2,-2));
        foodOptions.add(new ProblemOption("f2", "Gıda ithalatını artır", -1,3));
        foodOptions.add(new ProblemOption("f3", "Gıda israfını önleyecek yasalar çıkar", 3,1));
        foodOptions.add(new ProblemOption("f4", "Kentsel tarım projelerini destekle", 2,-1));
        foodOptions.add(new ProblemOption("f5", "Genetiği değiştirilmiş ürünleri yaygınlaştır", -3,4));
        foodOptions.add(new ProblemOption("f6", "Gıda dağıtım sistemlerini modernleştir", 1,2));
        problemList.add(new WorldProblem("food_security", "Dünya gıda tedarik zinciri kesintiye uğradı ve kıtlık riski var.", foodOptions));
        
        // Enerji krizi problemi
        List<ProblemOption> energyOptions = new ArrayList<>();
        energyOptions.add(new ProblemOption("en1", "Enerji tasarrufu kampanyası başlat", 1,-1));
        energyOptions.add(new ProblemOption("en2", "Nükleer enerji yatırımlarını artır", -2,4));
        energyOptions.add(new ProblemOption("en3", "Petrol ve doğalgaz anlaşması yap", -3,5));
        energyOptions.add(new ProblemOption("en4", "Akıllı şebeke sistemleri kur", 2,-2));
        energyOptions.add(new ProblemOption("en5", "Enerji fiyatlarını sübvanse et", 3,-4));
        energyOptions.add(new ProblemOption("en6", "Enerji ihracatını durdur", -1,2));
        problemList.add(new WorldProblem("energy_crisis", "Dünya enerji kaynakları tükeniyor ve fiyatlar artıyor.", energyOptions));
        
        // Göç krizi problemi
        List<ProblemOption> migrationOptions = new ArrayList<>();
        migrationOptions.add(new ProblemOption("m1", "Sınırları mültecilere aç", 3,-4));
        migrationOptions.add(new ProblemOption("m2", "Göç politikalarını sıkılaştır", -3,2));
        migrationOptions.add(new ProblemOption("m3", "Uluslararası göç anlaşmaları imzala", 1,-1));
        migrationOptions.add(new ProblemOption("m4", "Mülteci kamplarına yatırım yap", 2,-3));
        migrationOptions.add(new ProblemOption("m5", "Göçmen entegrasyon programları başlat", 3,-2));
        migrationOptions.add(new ProblemOption("m6", "Göç yardımları için uluslararası destek iste", 1,1));
        problemList.add(new WorldProblem("migration_crisis", "Savaş ve çatışmalardan kaçan mülteci sayısı rekor seviyeye ulaştı.", migrationOptions));
        
        // Siber güvenlik krizi problemi
        List<ProblemOption> cyberOptions = new ArrayList<>();
        cyberOptions.add(new ProblemOption("cy1", "Siber savunma sistemlerine yatırım yap", 1,-3));
        cyberOptions.add(new ProblemOption("cy2", "Uluslararası siber güvenlik anlaşması imzala", 2,-1));
        cyberOptions.add(new ProblemOption("cy3", "Vatandaşların internet erişimini kısıtla", -3,0));
        cyberOptions.add(new ProblemOption("cy4", "Siber güvenlik eğitimlerini yaygınlaştır", 2,-1));
        cyberOptions.add(new ProblemOption("cy5", "Siber saldırı tespit sistemleri kur", 1,-2));
        cyberOptions.add(new ProblemOption("cy6", "Kritik altyapı sistemlerini izole et", -1,3));
        problemList.add(new WorldProblem("cyber_security", "Kritik altyapı sistemlerine yönelik siber saldırılar artıyor.", cyberOptions));
        
        return problemList;
    }
}