// src/services/api.js

export async function fetchGameData() {
    // Burada gerçek bir endpoint'e istek atılabilir:
    // const response = await fetch("https://your-api-endpoint.com/api/gamedata");
    // return await response.json();
  
    // Örnek olarak sabit veriler dönüyoruz:
    return {
      economicStatus: 3, // 3/5
      welfareLevel: 3,   // 3/5
      policy: "Göçmenleri istemiyorsunuz. Sağcı bir politikanız var.",
      problem: "3. dünya savaşı çıktı.",
      // Oyuncular veya ülkeler için puan listesi
      players: [
        { name: "A", score: 10 },
        { name: "B", score: 8 },
        { name: "C", score: 7 },
        { name: "D", score: 5 },
        { name: "E", score: 3 }
      ]
    };
  }
  