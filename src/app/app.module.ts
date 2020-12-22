import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {msalConfig, msalAngularConfig} from './app-config';
import {Configuration} from 'msal';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {
    MsalModule,
    MsalInterceptor,
    MSAL_CONFIG,
    MSAL_CONFIG_ANGULAR,
    MsalService,
    MsalAngularConfiguration
} from '@azure/msal-angular';

function MSALConfigFactory(): Configuration {
    return msalConfig;
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
    return msalAngularConfig;
}

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        MsalModule,
        AppRoutingModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        },
        {
            provide: MSAL_CONFIG,
            useFactory: MSALConfigFactory
        },
        {
            provide: MSAL_CONFIG_ANGULAR,
            useFactory: MSALAngularConfigFactory
        },
        MsalService,
        StatusBar,
        SplashScreen,
        {
            provide:
            RouteReuseStrategy,
            useClass: IonicRouteStrategy
        }
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
