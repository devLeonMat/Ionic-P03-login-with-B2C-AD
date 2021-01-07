import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class JwtService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    userResponse = '';


    constructor() {
        this.userResponse = JSON.parse(localStorage.getItem('token'));
        this.currentUserSubject = new BehaviorSubject<string>(this.userResponse);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): string {
        return this.currentUserSubject.getValue();
    }

    isLoggedIn() {
        return this.currentUserValue && !!this.currentUserValue
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return this.currentUserValue;
    }

}
