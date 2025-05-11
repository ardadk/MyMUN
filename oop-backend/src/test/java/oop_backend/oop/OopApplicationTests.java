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
        // Her test öncesi yeni bir oyun oluştur (start endpoint'i kullanarak)
        String requestBody = """
            {
                "players": [
                    {"userId": 1, "countryName": "A"},
                    {"userId": 2, "countryName": "B"},
                    {"userId": 3, "countryName": "C"}
                ]
            }
            """;
        
        String response = mockMvc.perform(MockMvcRequestBuilders
                .post("/api/game/start")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
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
    void testStartGame() throws Exception {
        String requestBody = """
            {
                "players": [
                    {"userId": 4, "countryName": "D"},
                    {"userId": 5, "countryName": "E"}
                ]
            }
            """;
            
        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/game/start")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.gameId", notNullValue()))
                .andExpect(jsonPath("$.gameData.problem", notNullValue()))
                .andExpect(jsonPath("$.gameData.options", notNullValue()))
                .andExpect(jsonPath("$.gameData.players", hasSize(2)));
    }

    @Test
    void testGetNextProblem() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/game/problem/next/" + gameId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.problem", notNullValue()))
                .andExpect(jsonPath("$.options", notNullValue()));
    }

    @Test
    void testGetGamePlayers() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/game/players/" + gameId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3))) // 3 oyuncu eklemiştik
                .andExpect(jsonPath("$[0].countryName", notNullValue()));
    }

    @Test
    void testUpdatePlayerScores() throws Exception {
        String requestBody = """
            {
                "country": "A",
                "economyEffect": 3,
                "welfareEffect": 2
            }
            """;

        mockMvc.perform(MockMvcRequestBuilders
                .put("/api/game/info/" + gameId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)));
    }

    @Test
    void testGetGameInfo() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/game/info/" + gameId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.econScores", notNullValue()))
                .andExpect(jsonPath("$.welfareScores", notNullValue()))
                .andExpect(jsonPath("$.policies", notNullValue()));
    }

    @Test
    void testErrorHandling() throws Exception {
        // Geçersiz gameId ile istek
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/game/info/invalid-id")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGameFlow() throws Exception {
        // Tam bir oyun akışını test et
        
        // 1. Problem al
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/game/problem/next/" + gameId))
                .andExpect(status().isOk());

        // 2. Oyuncu A'nın seçimini yap
        String decisionA = """
            {
                "country": "A",
                "economyEffect": 3,
                "welfareEffect": 2
            }
            """;
        mockMvc.perform(MockMvcRequestBuilders
                .put("/api/game/info/" + gameId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(decisionA))
                .andExpect(status().isOk());
                
        // 3. Oyuncu B'nin seçimini yap
        String decisionB = """
            {
                "country": "B",
                "economyEffect": -1,
                "welfareEffect": 4
            }
            """;
        mockMvc.perform(MockMvcRequestBuilders
                .put("/api/game/info/" + gameId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(decisionB))
                .andExpect(status().isOk());
                
        // 4. Oyun bilgilerini kontrol et
        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/game/info/" + gameId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.econScores.A", not(50))) // Değişmiş olmalı
                .andExpect(jsonPath("$.welfareScores.B", not(50))); // Değişmiş olmalı
    }
}
