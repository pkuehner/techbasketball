import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import { environment } from "../../environments/environment";
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private apiService: ApiService) {
        localStorage.removeItem('userInfo');
    }

    public isAuthenticated(): boolean {
        let userData = localStorage.getItem('userInfo');
        if (userData && JSON.parse(userData)) {
            return true;
        }
        return false;
    }

    public setUserInfo(user) {
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    public validate(email, password) {
        return this.apiService.Post(environment.api.authenticate, {'username': email, 'password': password}).toPromise();
    }
}
