// src/app/services/admin-dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminDashboardService {
    private baseUrl = 'http://localhost:8083';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('No token found in localStorage!');
            throw new Error('Authentication token not found');
        }
        return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }

    getDashboardStats(): Observable<any> {
        // console.log('Fetching dashboard stats...');
        return this.http.get(`${this.baseUrl}/adminDashboard/stats`, { headers: this.getHeaders() });
    }
}
