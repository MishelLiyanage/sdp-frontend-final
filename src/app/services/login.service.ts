import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login-user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8083/account/login';

  constructor(private http: HttpClient) {}

  loginUser(loginData: LoginUser): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginData);
  }
}
