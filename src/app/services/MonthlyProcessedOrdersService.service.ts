import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface MonthlyOrdersData {
  month: string;
  orders: number;
}

@Injectable({
  providedIn: 'root'
})
export class MonthlyProcessedOrdersService {
  private baseUrl = 'http://localhost:8083/order/monthlyOrders';

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
    
  getProcessedOrders(): Observable<MonthlyOrdersData[]> {
    return this.http.get<MonthlyOrdersData[]>(this.baseUrl, { headers: this.getHeaders() });
  }
}
