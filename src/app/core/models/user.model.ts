export class UserModel {
    exp: number;
    nbf: number;
    ver: string;
    iss: string;
    sub: string;
    aud: string;
    nonce: string;
    iat: number;
    auth_time: number;
    access_token: string;
    expires_in: number;
    metadata: string;
    refresh_token: string;
    correo: string;
    username: string;
    restObjectId: string;
    name: string;
    IdToken: number;
    altsecid: string;
    picture: string;
    preferred_username: string;
    expires_on: number;
    refresh_token_expires_in: number;
    not_before: number;
    tid: string;
}

export class User {
    sessionId = '';
    name = '';
    email = '';
    numtel = '';
    companyInfoCompleted = false;
    emailFlag = false;
    loginResponse: LoginResponse;
}

export class LoginResponse {
    accessToken = '';
    tokenType = '';
    username = '';
}
