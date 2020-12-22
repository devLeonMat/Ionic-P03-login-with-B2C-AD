import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Subscription} from "rxjs";
import {CryptoUtils, Logger} from "msal";
import {BroadcastService, MsalService} from "@azure/msal-angular";
import {isIE} from "./app-config";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    // subscriptions: Subscription[] = [];
    // isIframe = false;
    // loggedIn = false;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        // private broadcastService: BroadcastService, private authService: MsalService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        // let loginSuccessSubscription: Subscription;
        // let loginFailureSubscription: Subscription;
        //
        // this.isIframe = window !== window.parent && !window.opener;
        // this.checkAccount();
        //
        // // event listeners for authentication status
        // loginSuccessSubscription = this.broadcastService.subscribe('msal:loginSuccess', (success) => {
        //
        //     // We need to reject id tokens that were not issued with the default sign-in policy.
        //     // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
        //     // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
        //     //   if (success.idToken.claims.acr === b2cPolicies.names.resetPassword) {
        //     //     window.alert('Password has been reset successfully. \nPlease sign-in with your new password');
        //     //     return this.authService.logout();
        //     //   }
        //
        //     console.log('login succeeded. id token acquired at: ' + new Date().toString());
        //     console.log(success);
        //
        //     this.checkAccount();
        // });
        //
        // loginFailureSubscription = this.broadcastService.subscribe('msal:loginFailure', (error) => {
        //     console.log('login failed');
        //     console.log(error);
        // });
        //
        // // redirect callback for redirect flow (IE)
        // this.authService.handleRedirectCallback((authError, response) => {
        //     if (authError) {
        //         console.error('Redirect Error: ', authError.errorMessage);
        //         return;
        //     }
        //
        //     console.log('Redirect Success: ', response);
        // });
        //
        // this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
        //     console.log('MSAL Logging: ', message);
        // }, {
        //     correlationId: CryptoUtils.createNewGuid(),
        //     piiLoggingEnabled: false
        // }));
        //
        // this.subscriptions.push(loginSuccessSubscription);
        // this.subscriptions.push(loginFailureSubscription);
    }

  // ngOnDestroy(): void {
  //   this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  // }
  //
  // // other methods
  // checkAccount() {
  //   this.loggedIn = !!this.authService.getAccount();
  // }
  //
  // login() {
  //   if (isIE) {
  //     this.authService.loginRedirect();
  //   } else {
  //     this.authService.loginPopup();
  //   }
  // }
  //
  // logout() {
  //   this.authService.logout();
  // }

}
