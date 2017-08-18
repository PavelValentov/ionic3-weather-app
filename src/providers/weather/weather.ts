import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WeatherProvider {
    apiKey = 'srRLeAmTroxPinDG8Aus3Ikl6tLGJd94';
    lang = 'ru-ru';
    // baseUrl = 'http://dataservice.accuweather.com';
    baseUrl = 'https://api.accuweather.com';
    url: string;

    location: {
        key: string,
        city: string,
        state: string
    };

    constructor(public http: Http) {
        this.url = this.baseUrl +
            encodeURI('?apikey=' + this.apiKey);
        // console.log('Base URL: ' + this.baseUrl);
    }

    getWeather(location: WeatherLocation) {
        if (!location || !location.hasOwnProperty('key')) return null;

        // http://dataservice.accuweather.com/currentconditions/v1/290868?apikey=9oUg1Ge7VpIOYzZbin0yfApxj8ASG8dN&language=ru-ru&details=true
        this.url = this.baseUrl +
            '/currentconditions/v1/' + location.key + '.json' +
            '?apikey=' + this.apiKey +
            '&language=' + this.lang +
            '&details=true&getphotos=true';

        // console.log('url: ' + this.url);
        return this.http.get(this.url)
            .map(res => {
                console.log('Got weather response:');
                // console.log(res.json());
                return res.json()
            });
    }

    getStates() {
        console.log(this.url);
        this.url = this.baseUrl +
            encodeURI('/locations/v1/adminareas/ru?apikey=' +
                this.apiKey + '&language=' + this.lang +
                '&offset=-1');
        return this.http.get(this.url)
            .map(res => {
                console.log('Got states response:');
                // console.log(res.json());
                return res.json()
            });
    }

    getCities(city) {
        // https://api.accuweather.com/locations/v1/cities/autocomplete.json?apikey=srRLeAmTroxPinDG8Aus3Ikl6tLGJd94&language=ru&q=
        this.url = this.baseUrl +
            encodeURI('/locations/v1/cities/autocomplete.json'+
                '?apikey=' + this.apiKey +
                '&language=' + this.lang +
                '&q=' + city +
                '&offset=-1');
        return this.http.get(this.url)
            .map(res => {
                console.log('Got cities response:');
                // console.log(res.json());
                return res.json()
            });
    }
}

export interface WeatherLocation {
    key: string;
    city: string;
    state: string;
}