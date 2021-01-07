import {Injectable} from '@angular/core';
import {Api, protocolRegExp} from '../models/api';
import {environment} from 'src/environments/environment';

@Injectable()
export class ApiService {
    public endpoints: Api = new Api();
    private host: string;
    private apiPrefix: string;
    private apiVersion: string;

    constructor() {
        this.host = environment.backend.host;
        this.apiPrefix = 'conference-B2C';
    }

    public createUrl(url: string, isLogin: boolean = false): string {
        const protocolValidation = new RegExp(protocolRegExp.httpOrHttps);
        if (protocolValidation.test(url) || url.startsWith('/assets')) {
            return url;
        }
        return `${this.host}/${this.apiPrefix}/${url}`;
    }

    public JSONtoParams(jsonObj) {
        return Object.keys(jsonObj)
            .map((key) => key + '=' + jsonObj[key])
            .join('&');
    }
}
