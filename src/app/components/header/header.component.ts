import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {BroadcastService, MsalService} from "@azure/msal-angular";

import {Logger, CryptoUtils} from 'msal';
import {AuthenticationService} from "../../core/services/authentication.service";
import {apiConfig, apiConfigs} from "../../app-config";

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
                public authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        let loginSuccessSubscription: Subscription;
        let loginFailureSubscription: Subscription;

        this.isIframe = window !== window.parent && !window.opener;
        this.checkAccount();

        // event listeners for authentication status
        loginSuccessSubscription = this.broadcastService.subscribe('msal:loginSuccess', (success) => {
            console.log('login succeeded. id token acquired at: ' + new Date().toString());
            alert('login succeeded. id token acquired at: ' + success);
            console.log(success);
            this.checkAccount();
        });

        loginFailureSubscription = this.broadcastService.subscribe('msal:loginFailure', (error) => {
            console.log('login failed');
            alert('login failed' + error);
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
        // MSAL method of call to redirect
        this.authService.loginRedirect();
        setTimeout(() => {
            this.silentLogin();
        }, 5000);
    }


    silentLogin() {

        var _this = this; // JS this :(
        // var tokenRequest = {
        //     //https://tdppocb2c.b2clogin.com/tdppocb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_signup_signin&client_id=34f924b4-e26d-4621-9ceb-b0cbd503183b&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fjwt.ms&scope=openid&response_type=id_token&prompt=login
        //     scopes: ['https://tdppocb2c.b2clogin.com/tdppocb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_signup_signin&client_id=34f924b4-e26d-4621-9ceb-b0cbd503183b&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fjwt.ms&scope=openid&response_type=id_token&prompt=login']
        // };
        // _this.authService.authority = "https://b2cprod.b2clogin.com/te/b2cprod.onmicrosoft.com/B2C_1A_MFA_phone_or_email_SUSI";
        _this.authService.acquireTokenSilent(apiConfigs).then(
            function (token: any) {
                var accesstoken = token.accessToken;
                console.log(accesstoken);
                // localStorage.setItem('accesstoken', accesstoken);
            }, function (error: any) {
                alert(error);
            });
    }

    logout() {
        this.authenticationService.isLoginCorrect = false;
        this.authService.logout();
        localStorage.clear();
    }

}
