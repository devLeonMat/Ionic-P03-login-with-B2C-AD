import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {BroadcastService, MsalService} from "@azure/msal-angular";

import {Logger, CryptoUtils} from 'msal';
import {AuthenticationService} from "../../core/services/authentication.service";

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
    }

    logout() {
        this.authenticationService.isLoginCorrect = false;
        this.authService.logout();
        localStorage.clear();
    }

}
