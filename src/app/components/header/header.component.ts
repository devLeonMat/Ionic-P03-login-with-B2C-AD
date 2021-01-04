import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Subscription} from "rxjs";
import {BroadcastService, MsalService} from "@azure/msal-angular";
import {Logger, CryptoUtils} from 'msal';
import {isIE, b2cPolicies} from '../../app-config';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    subscriptions: Subscription[] = [];
    loggedIn = false;
    isIframe = false;

    constructor(private broadcastService: BroadcastService,
                private authService: MsalService,
                private iab: InAppBrowser) {
    }

    ngOnInit() {
        let loginSuccessSubscription: Subscription;
        let loginFailureSubscription: Subscription;

        this.isIframe = window !== window.parent && !window.opener;
        this.checkAccount();

        // event listeners for authentication status
        loginSuccessSubscription = this.broadcastService.subscribe('msal:loginSuccess', (success) => {

            // We need to reject id tokens that were not issued with the default sign-in policy.
            // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
            // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
            //   if (success.idToken.claims.acr === b2cPolicies.names.resetPassword) {
            //     window.alert('Password has been reset successfully. \nPlease sign-in with your new password');
            //     return this.authService.logout();
            //   }

            console.log('login succeeded. id token acquired at: ' + new Date().toString());
            console.log(success);

            this.checkAccount();
        });

        loginFailureSubscription = this.broadcastService.subscribe('msal:loginFailure', (error) => {
            console.log('login failed');
            console.log(error);
        });

        // redirect callback for redirect flow (IE)
        this.authService.handleRedirectCallback((authError, response) => {
            if (authError) {
                console.error('Redirect Error: ', authError.errorMessage);
                return;
            }

            console.log('Redirect Success: ', response);
        });

        this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
            console.log('MSAL Logging: ', message);
        }, {
            correlationId: CryptoUtils.createNewGuid(),
            piiLoggingEnabled: false
        }));

        this.subscriptions.push(loginSuccessSubscription);
        this.subscriptions.push(loginFailureSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    checkAccount() {
        this.loggedIn = !!this.authService.getAccount();

    }

    login() {
        // if (isIE) {
            this.authService.loginRedirect();
        // } else {
        //     this.authService.loginPopup();
        // }
    }

    logout() {
        this.authService.logout();
    }

}
