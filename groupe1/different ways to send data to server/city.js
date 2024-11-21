class City {
    constructor(name, country, continent) {
        this.name = name
        this.country = country
        this.continent = continent
    }
    toString(){
        return `${this.name} ${this.country} ${this.continent}\n`
    }
}
module.exports = City