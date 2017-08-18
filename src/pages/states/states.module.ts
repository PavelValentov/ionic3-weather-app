import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatesPage } from './states';

@NgModule({
  declarations: [
    StatesPage,
  ],
  imports: [
    IonicPageModule.forChild(StatesPage),
  ],
})
export class StatesPageModule {}
