package oop_backend.oop.service;

import oop_backend.oop.model.WorldProblem;
import java.util.List;
import java.util.Optional;

public interface ProblemService {
    /**
     * Rastgele bir dünya problemi seçer
     * @return Seçilen dünya problemi
     */
    WorldProblem selectRandomProblem();
    
    /**
     * Belirli bir ID'ye sahip problemi döndürür
     * @param id Problem ID'si
     * @return İstenen problem veya boş Optional
     */
    Optional<WorldProblem> getProblem(String id);
    
    /**
     * Tüm dünya problemlerini döndürür
     * @return Tüm problemlerin listesi
     */
    List<WorldProblem> getAllProblems();
}