import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {


    constructor() {
    }

    // authenticate2() {
    //     let authContext = new Microsoft.ADAL.AuthenticationContext("https://tdppocb2c.b2clogin.com/tfp/tdppocb2c.onmicrosoft.com/B2C_1A_signup_signin");
    //     authContext.acquireTokenAsync("http://localhost:4205/", "247617a1-7fd2-46e0-beda-bb1955504200", "http://MyDirectorySearcherApp")
    //         .then((authResponse) => {
    //             console.log("Token acquired: " + authResponse.accessToken);
    //             console.log("Token will expire on: " + authResponse.expiresOn);
    //         }, function (err) {
    //             console.log("Failed to authenticate: " + err);
    //         });
    // }


}
