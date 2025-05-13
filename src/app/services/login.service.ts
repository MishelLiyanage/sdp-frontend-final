import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login-user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8083/account/login';

  constructor(private http: HttpClient,
    private router: Router
  ) {}

  loginUser(loginData: LoginUser): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginData);
  }

  logout(): void {
    // Remove token from storage
    localStorage.removeItem('accessToken');
    // Optional: clear other user data
    localStorage.removeItem('currentUser');

    // Navigate to login or home page
    this.router.navigate(['publicPage/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
