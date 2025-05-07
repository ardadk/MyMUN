import { ProblemOption } from './ProblemOption';

export class WorldProblem {
    constructor(data = {}) {
        this.description = data.description || '';
        this.options = data.options ? 
            data.options.map(option => new ProblemOption(option)) : 
            [];
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    getOptions() {
        return this.options;
    }

    setOptions(options) {
        this.options = options.map(option => 
            option instanceof ProblemOption ? option : new ProblemOption(option)
        );
    }

    static fromApi(apiData) {
        return new WorldProblem(apiData);
    }
}