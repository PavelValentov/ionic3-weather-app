import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {AboutPage} from '../pages/about/about';
import {StatesPage} from '../pages/states/states';
import {CitiesPage} from '../pages/cities/cities';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;
    curPage: any;

    pages: Array<{ title: string, component: any}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Погода', component: HomePage},
            {title: 'Выбрать город', component: CitiesPage},
            {title: 'Список регионов', component: StatesPage},
            {title: 'О приложении', component: AboutPage}
        ];

        this.curPage = this.pages[0];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        // this.nav.setRoot(page.component);
        this.nav.push(page.component);
        this.curPage = page;
    }

    checkActive(page) {
        return page == this.curPage;
    }
}
