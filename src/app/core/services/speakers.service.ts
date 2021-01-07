import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class SpeakersService {

    private headers: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getSpeakers(): Observable<any> {
        return this.http.get(this.apiService.endpoints.realEstate.getSpeakers(), {
            headers: this.headers.set('Ocp-Apim-Subscription-Key', '675cd0dfe70e40c7aab70a2257f7542e'),
        });
    }

}
