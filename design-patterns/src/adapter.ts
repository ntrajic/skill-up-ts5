import axios from 'axios';
import * as fs from 'fs';

interface Country {
    name: string;
    capital: string;
    currency: string;
}

interface ICountriesRepository {
    all(): Promise<Country[]>;
    allByContinent(continent: Continent): Promise<Country[]>;
    allByCurrency(currency: string): Promise<Country[]>;
}

class RestCountriesAdapter implements ICountriesRepository{
    constructor(private _restCountriesApi: RestCountries) {}
    
    private restCountryToCountry(restCountry: any): Country {
        return {
            name: restCountry.name,
            capital: restCountry.capital,
            currency: restCountry.currencies[0].code
        }
    }

    private restCountriesToCountries(restCountries: any[]): Country[] {
        return restCountries.map(restCountry => this.restCountryToCountry(restCountry));
    }

    async all(): Promise<Country[]> {
        let restCountries = await this._restCountriesApi.getAll();
        return this.restCountriesToCountries(restCountries);
    }

    async allByContinent(continent: Continent): Promise<Country[]> {
        let region = "";
        if(continent == Continent.NorthAmerica || continent == Continent.SouthAmerica) {
            region = "Americas";
        }
        else {
            region = Continent[continent];
        }
        let restCountries = await this._restCountriesApi.getByRegion(region);
        let result = [];
        if(continent == Continent.NorthAmerica) {
            result = restCountries.filter(restCountry => restCountry.subregion == "Northern America");
        }
        else if(continent == Continent.SouthAmerica) {
            result = restCountries.filter(restCountry => restCountry.subregion == "South America");
        }
        else {
            result = restCountries;
        }
        return this.restCountriesToCountries(result);
    }

    async allByCurrency(currency: string): Promise<Country[]> {
        let restCountries = await this._restCountriesApi.getByCurrency(currency);
        return this.restCountriesToCountries(restCountries);
    }
}

class RestCountries {
    private _baseUrl: string = "https://restcountries.eu/rest/v2/";
    
    private async getParsedCountries(url: string): Promise<any[]>{
        return axios.get(url).then(response => response.data).then(data => data as any[]);
    }

    async getAll(): Promise<any[]> {
        return this.getParsedCountries(`${this._baseUrl}all`);
    }
    
    async getByName(name: string): Promise<any[]> {
        return this.getParsedCountries(`${this._baseUrl}name/${name}`);
    }

    async getByFullName(fullName: string): Promise<any[]> {
        return this.getParsedCountries(`${this._baseUrl}fullName/${fullName}`);
    }

    async getByCode(code: string): Promise<any[]> {
        return this.getParsedCountries(`${this._baseUrl}alpha/${code}`);
    }

    async getByCurrency(currency: string): Promise<any[]> {
        return this.getParsedCountries(`${this._baseUrl}currency/${currency}`);
    }
    
    async getByCapitalCity(capital: string): Promise<any[]> {
        return this.getParsedCountries(`${this._baseUrl}capital/${capital}`);
    }

    async getByCallingCode(callingCode: string): Promise<any[]> {
        return this.getParsedCountries(`${this._baseUrl}callingcode/${callingCode}`);
    }

    async getByRegion(region: string): Promise<any[]> {
        return this.getParsedCountries(`${this._baseUrl}region/${region}`);
    }
}

enum Continent {
    Africa = "Africa",
    Asia = "Asia",
    Europe = "Europe",
    NorthAmerica = "NorthAmerica",
    SouthAmerica = "SouthAmerica",
    Oceania = "Oceania"
}

class CountriesRepository implements ICountriesRepository {
    async all(): Promise<Country[]> {
        return Promise.all([Continent.Africa, Continent.Asia, Continent.Europe, Continent.NorthAmerica, Continent.SouthAmerica]
            .map(continent => this.allByContinent(continent))).then(results => {
                let consolidated: Country[] = [];
                results.forEach(result => {
                    consolidated.push(...result);
                });
                return consolidated;
        });
    }

    async allByContinent(continent: Continent): Promise<Country[]> {
        return new Promise<Country[]>((resolve, reject) => {

            fs.readFile(this.continentToFileName(continent), "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if(err) {
                    reject(err);
                }
                else {
                    let countries: Country[] = JSON.parse(data);
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

    async allByCurrency(currency: string): Promise<Country[]> {
        let all = await this.all();
        return all.filter(country => country.currency == currency);
    }

    private continentToFileName(continent: Continent) {
        let prefix: string = "countries/";
        let fileNames: any = {};
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