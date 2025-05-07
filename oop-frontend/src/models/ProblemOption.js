export class ProblemOption {
    constructor(data = {}) {
        this.id = data.id || null;
        this.text = data.text || '';
        this.environmentalImpact = data.environmentalImpact || 0;
        this.economicImpact = data.economicImpact || 0;
        this.socialImpact = data.socialImpact || 0;
    }

    getId() {
        return this.id;
    }

    getText() {
        return this.text;
    }

    getEnvironmentalImpact() {
        return this.environmentalImpact;
    }

    getEconomicImpact() {
        return this.economicImpact;
    }

    getSocialImpact() {
        return this.socialImpact;
    }

    static fromApi(apiData) {
        return new ProblemOption(apiData);
    }
}