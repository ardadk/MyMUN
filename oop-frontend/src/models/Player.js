export class Player {
    constructor(data = {}) {
        this.userId = data.userId || null;
        this.countryName = data.countryName || '';
        this.rating = data.rating || 0;
        this.policy = data.policy || '';
    }

    // Getters ve setters
    getUserId() {
        return this.userId;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    getCountryName() {
        return this.countryName;
    }

    setCountryName(countryName) {
        this.countryName = countryName;
    }

    getRating() {
        return this.rating;
    }

    setRating(rating) {
        this.rating = rating;
    }

    getPolicy() {
        return this.policy;
    }

    setPolicy(policy) {
        this.policy = policy;
    }

    // API'den gelen veriyi Player modeline dönüştürür
    static fromApi(apiData) {
        return new Player(apiData);
    }

    // Birden fazla oyuncuyu dönüştürmek için yardımcı metod
    static listFromApi(playerDataArray) {
        // Add null check before mapping
        if (!playerDataArray || !Array.isArray(playerDataArray)) {
            console.error('Expected player array but received:', playerDataArray);
            return []; // Return empty array instead of failing
        }
        
        return playerDataArray.map(playerData => Player.fromApi(playerData));
    }

    // Backend'e gönderilecek formata dönüştürür
    toApiFormat() {
        return {
            userId: this.userId,
            countryName: this.countryName,
            rating: this.rating
        };
    }
}