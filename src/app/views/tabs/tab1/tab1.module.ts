import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';


import {Tab1PageRoutingModule} from './tab1-routing.module';
import {AppModule} from "../../../app.module";
import {HeaderComponent} from "../../../components/header/header.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [Tab1Page, HeaderComponent]
})
export class Tab1PageModule {
}
