export class Player {
    constructor(data = {}) {
        this.userId = data.userId || null;
        this.countryName = data.countryName || '';
        this.rating = data.rating || 0;
        this.policy = data.policy || '';
    }

   
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

    static fromApi(apiData) {
        return new Player(apiData);
    }

    static listFromApi(playerDataArray) {
        if (!playerDataArray || !Array.isArray(playerDataArray)) {
            console.error('Expected player array but received:', playerDataArray);
            return []; 
        }
        
        return playerDataArray.map(playerData => Player.fromApi(playerData));
    }

    
    toApiFormat() {
        return {
            userId: this.userId,
            countryName: this.countryName,
            rating: this.rating
        };
    }
}