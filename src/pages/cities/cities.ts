import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {WeatherLocation, WeatherProvider} from "../../providers/weather/weather";
import {ToastController} from 'ionic-angular';
import {HomePage} from "../home/home";

export const enum CityStatuses {
    tooMuch = 1,
    notFound = 2,
    readyToSelect = 3
}

@IonicPage()
@Component({
    selector: 'page-cities',
    templateUrl: 'cities.html',
})
export class CitiesPage {
    private currCity: WeatherLocation;
    public cities: any;
    public city: string;
    public cityStatus: CityStatuses = CityStatuses.notFound;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private weatherProvider: WeatherProvider,
                private storage: Storage,
                public toastCtrl: ToastController) {
        this.storage.get('location').then((val) => {
            if (val) {
                let location = JSON.parse(val);
                this.city = location.city;
            } else {
                this.city = 'Юрга';
            }
            this.updateCities();
        });
    }

    presentToast(city) {
        let toast = this.toastCtrl.create({
            message: 'Выбран город ' + city,
            duration: 1500,
            cssClass: 'toast'
        });

        toast.onDidDismiss(() => {
            // this.navCtrl.push(HomePage);
            this.navCtrl.popToRoot();
        });

        toast.present();
    }

    updateCities() {
        this.cityStatus = CityStatuses.notFound;
        this.weatherProvider.getCities(this.city)
            .subscribe(cities => {
                // console.log('Subscription of cities:');
                // console.log(cities);
                if (!cities) {
                    console.log('error while getting cities: empty response');
                    this.cities = null;
                } else if (cities.length === 0) {
                    console.log('there are no such cities');
                    this.cities = null;
                } else if (cities.hasOwnProperty('Code')) {
                    console.log('API error while getting cities with code ' + cities.Code + ': ' + cities.Message);
                    this.cities = null;
                } else {
                    if (cities.length >= 10) this.cityStatus = CityStatuses.tooMuch;
                    else this.cityStatus = CityStatuses.readyToSelect;

                    this.cities = cities;
                }
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CitiesPage');
    }

    ionViewWillEnter() {
        this.updateCities();
    }

    searchCityClick(event) {
        this.updateCities();
    }

    selectCityClick($event) {
        var el = $event.target.parentElement;
        this.currCity = {
            key: el.getElementsByClassName("city-key")[0].innerText.trim(),
            city: el.getElementsByClassName("city-name")[0].innerText.trim(),
            state: el.getElementsByClassName("city-state")[0].innerText.trim()
        };

        this.storage.set('location', JSON.stringify(this.currCity));

        this.presentToast(this.currCity.city);
    }

    cityKeyPress(event) {
        // event.altKey
        if (event.keyCode == 13) {
            this.updateCities();
        } else {
            // console.log(event.keyCode);
        }
    }
}
