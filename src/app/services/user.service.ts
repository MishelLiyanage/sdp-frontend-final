import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:8083';
    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('accessToken');
        console.log('Token:', token); // Debugging line to check the token value
        if (!token) {
          console.error('No token found in localStorage!');
          throw new Error('Authentication token not found');
        }
        return new HttpHeaders({ Authorization: `Bearer ${token}` });
      }

    getCurrentUser(): Observable<any> {
        return this.http.get(`${this.baseUrl}/account/currentuser`, { headers: this.getHeaders() });
    }
}