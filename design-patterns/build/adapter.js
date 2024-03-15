"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
class RestCountriesAdapter {
    _restCountriesApi;
    constructor(_restCountriesApi) {
        this._restCountriesApi = _restCountriesApi;
    }
    restCountryToCountry(restCountry) {
        return {
            name: restCountry.name,
            capital: restCountry.capital,
            currency: restCountry.currencies[0].code
        };
    }
    restCountriesToCountries(restCountries) {
        return restCountries.map(restCountry => this.restCountryToCountry(restCountry));
    }
    async all() {
        let restCountries = await this._restCountriesApi.getAll();
        return this.restCountriesToCountries(restCountries);
    }
    async allByContinent(continent) {
        let region = "";
        if (continent == Continent.NorthAmerica || continent == Continent.SouthAmerica) {
            region = "Americas";
        }
        else {
            region = Continent[continent];
        }
        let restCountries = await this._restCountriesApi.getByRegion(region);
        let result = [];
        if (continent == Continent.NorthAmerica) {
            result = restCountries.filter(restCountry => restCountry.subregion == "Northern America");
        }
        else if (continent == Continent.SouthAmerica) {
            result = restCountries.filter(restCountry => restCountry.subregion == "South America");
        }
        else {
            result = restCountries;
        }
        return this.restCountriesToCountries(result);
    }
    async allByCurrency(currency) {
        let restCountries = await this._restCountriesApi.getByCurrency(currency);
        return this.restCountriesToCountries(restCountries);
    }
}
class RestCountries {
    _baseUrl = "https://restcountries.eu/rest/v2/";
    async getParsedCountries(url) {
        return axios_1.default.get(url).then(response => response.data).then(data => data);
    }
    async getAll() {
        return this.getParsedCountries(`${this._baseUrl}all`);
    }
    async getByName(name) {
        return this.getParsedCountries(`${this._baseUrl}name/${name}`);
    }
    async getByFullName(fullName) {
        return this.getParsedCountries(`${this._baseUrl}fullName/${fullName}`);
    }
    async getByCode(code) {
        return this.getParsedCountries(`${this._baseUrl}alpha/${code}`);
    }
    async getByCurrency(currency) {
        return this.getParsedCountries(`${this._baseUrl}currency/${currency}`);
    }
    async getByCapitalCity(capital) {
        return this.getParsedCountries(`${this._baseUrl}capital/${capital}`);
    }
    async getByCallingCode(callingCode) {
        return this.getParsedCountries(`${this._baseUrl}callingcode/${callingCode}`);
    }
    async getByRegion(region) {
        return this.getParsedCountries(`${this._baseUrl}region/${region}`);
    }
}
var Continent;
(function (Continent) {
    Continent["Africa"] = "Africa";
    Continent["Asia"] = "Asia";
    Continent["Europe"] = "Europe";
    Continent["NorthAmerica"] = "NorthAmerica";
    Continent["SouthAmerica"] = "SouthAmerica";
    Continent["Oceania"] = "Oceania";
})(Continent || (Continent = {}));
class CountriesRepository {
    async all() {
        return Promise.all([Continent.Africa, Continent.Asia, Continent.Europe, Continent.NorthAmerica, Continent.SouthAmerica]
            .map(continent => this.allByContinent(continent))).then(results => {
            let consolidated = [];
            results.forEach(result => {
                consolidated.push(...result);
            });
            return consolidated;
        });
    }
    async allByContinent(continent) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.continentToFileName(continent), "utf8", (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (err) {
                    reject(err);
                }
                else {
                    let countries = JSON.parse(data);
                    resolve(countries);
                }
            });
            // fs.readFile(this.continentToFileName(continent), "utf8", (err, data) => {
            //     if(err) {
            //         reject(err);
            //     }
            //     else {
            //         let countries: Country[] = JSON.parse(data);
            //         resolve(countries);
            //     }
            // });
        });
    }
    async allByCurrency(currency) {
        let all = await this.all();
        return all.filter(country => country.currency == currency);
    }
    continentToFileName(continent) {
        let prefix = "countries/";
        let fileNames = {};
        fileNames[Continent.Africa] = "africa.json";
        fileNames[Continent.Asia] = "asia.json";
        fileNames[Continent.Europe] = "europe.json";
        fileNames[Continent.NorthAmerica] = "northAmerica.json";
        fileNames[Continent.SouthAmerica] = "southAmerica.json";
        return prefix + fileNames[Continent[continent]];
    }
}
// let countriesRepo = new CountriesRepository();
let countriesRepo = new RestCountriesAdapter(new RestCountries());
countriesRepo.allByCurrency("EUR").then(euroCountries => {
    console.log("Euro countries: ", euroCountries);
});
countriesRepo.allByContinent(Continent.NorthAmerica).then(northAmerica => {
    console.log(`Number of north american countries stored: ${northAmerica.length}`);
});
// Demo code
let restCountries = new RestCountries();
restCountries.getByRegion("Americas").then(northAmericaCountries => {
    console.log(`Number of north america countries: ${northAmericaCountries.length}`);
});
// \design-patterns> tsc
// \design-patterns> node .\build\adapter.js
// OUT: 
// connect.timesout
