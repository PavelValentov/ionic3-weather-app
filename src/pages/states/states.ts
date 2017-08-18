import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {WeatherProvider} from "../../providers/weather/weather";

/**
 * Generated class for the CitiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-states',
    templateUrl: 'states.html',
})
export class StatesPage {
    states: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private weatherProvider: WeatherProvider) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad StatesPage');
    }

    ionViewWillEnter() {
        function compare(a,b) {
            if (a.LocalizedName < b.LocalizedName)
                return -1;
            if (a.LocalizedName > b.LocalizedName)
                return 1;
            return 0;
        }

        this.weatherProvider.getStates()
            .subscribe(states => {
                console.log('Subscription of states - OK');
                // console.log(states);
                this.states = states;

                this.states.sort(compare);
            });
    }
}
