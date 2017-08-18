import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";

import {HomePage} from '../pages/home/home';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
// import {AboutPage} from "../pages/about/about";
// import {CitiesPage} from '../pages/cities/cities';
// import {StatesPage} from "../pages/states/states";

import {AboutPageModule} from "../pages/about/about.module";
import {CitiesPageModule} from '../pages/cities/cities.module';
import {StatesPageModule} from "../pages/states/states.module";

import {WeatherProvider} from '../providers/weather/weather';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': '0f3abfa9'
    }
};

@NgModule({
    declarations: [
        MyApp,
        HomePage
        // AboutPage,
        // CitiesPage,
        // StatesPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AboutPageModule,
        CitiesPageModule,
        StatesPageModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(MyApp),
        CloudModule.forRoot(cloudSettings)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
        // AboutPage,
        // CitiesPage,
        // StatesPage
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
