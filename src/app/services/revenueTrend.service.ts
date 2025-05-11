import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface MonthlyRevenue {
  month: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})

export class RevenueTrendService {
  private baseUrl = 'http://localhost:8083/payment/monthly-revenue';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('accessToken');
      console.log('Token:', token); // Debugging line to check the token value
      if (!token) {
        console.error('No token found in localStorage!');
        throw new Error('Authentication token not found');
      }
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
  

  getMonthlyRevenue(): Observable<MonthlyRevenue[]> {
    return this.http.get<MonthlyRevenue[]>(this.baseUrl, { headers:this.getHeaders() });
  }
}
