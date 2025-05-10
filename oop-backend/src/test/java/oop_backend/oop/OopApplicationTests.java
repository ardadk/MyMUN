package oop_backend.oop;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class OopApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    private String gameId;

    @BeforeEach
    void setUp() throws Exception {
        // Her test öncesi yeni bir oyun oluştur
        String response = mockMvc.perform(MockMvcRequestBuilders
                .post("/api/game/create")
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse()
                .getContentAsString();
        
        // gameId'yi JSON'dan çıkar
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response);
        gameId = root.get("gameId").asText();
    }

    @Test
    void contextLoads() {
    }

    @Test
    void testCreateGame() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/game/create")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.gameId", notNullValue()));
    }

    @Test
    void testGetNextProblem() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/game/problem/next/" + gameId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.problem.description", notNullValue()))
                .andExpect(jsonPath("$.options", hasSize(greaterThan(0))));
    }

    @Test
    void testUpdateGameInfo() throws Exception {
        String requestBody = """
            {
                "country": "A",
                "economyEffect": 5,
                "welfareEffect": -2
            }
            """;

        mockMvc.perform(MockMvcRequestBuilders
                .put("/api/game/info/" + gameId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk());
    }

    @Test
    void testGetAllProblems() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/game/problems")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    @Test
    void testGetCurrentProblem() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/game/problem/current/" + gameId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description", notNullValue()));
    }

    @Test
    void testGetGameScore() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/game/score/" + gameId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.econScores", notNullValue()))
                .andExpect(jsonPath("$.welfareScores", notNullValue()));
    }

    @Test
    void testUpdateGameScore() throws Exception {
        String requestBody = """
            {
                "country": "A",
                "score": 5
            }
            """;

        mockMvc.perform(MockMvcRequestBuilders
                .put("/api/game/score/" + gameId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk());
    }

    @Test
    void testErrorHandling() throws Exception {
        // Geçersiz gameId ile istek
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/game/problem/next/invalid-id")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGameFlow() throws Exception {
        // 1. Oyun oluştur
        // 2. İlk problemi al
        // 3. Kararı gönder
        // 4. Skoru güncelle
        // Tam bir oyun akışını test et
        
        // Oyun oluşturma zaten setUp'ta yapılıyor
        
        // Problem al
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/game/problem/next/" + gameId))
                .andExpect(status().isOk());

        // Karar gönder
        String decision = """
            {
                "country": "A",
                "economyEffect": 3,
                "welfareEffect": 2
            }
            """;
        mockMvc.perform(MockMvcRequestBuilders
                .put("/api/game/info/" + gameId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(decision))
                .andExpect(status().isOk());

        // Skor güncelle
        String score = """
            {
                "country": "A",
                "score": 5
            }
            """;
        mockMvc.perform(MockMvcRequestBuilders
                .put("/api/game/score/" + gameId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(score))
                .andExpect(status().isOk());
    }
}
