import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {CitiesPage} from '../pages/cities/cities';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AboutPage} from "../pages/about/about";
import {SettingsPage} from "../pages/settings/settings";
import {WeatherProvider} from '../providers/weather/weather';
import {StatesPage} from "../pages/states/states";

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': '0f3abfa9'
    }
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AboutPage,
        SettingsPage,
        ListPage,
        CitiesPage,
        StatesPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(MyApp),
        CloudModule.forRoot(cloudSettings)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AboutPage,
        SettingsPage,
        ListPage,
        CitiesPage,
        StatesPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        WeatherProvider
    ]
})
export class AppModule {
}
