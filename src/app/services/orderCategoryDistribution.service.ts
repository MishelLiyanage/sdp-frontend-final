import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface OrderCategoryData {
  category: string;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderCategoryDistribution {
  private baseUrl = 'http://localhost:8083/order/distribution';

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

  getOrderDistribution(): Observable<OrderCategoryData[]> {
    console.log('Fetching order distribution data...');
    return this.http.get<OrderCategoryData[]>(this.baseUrl, { headers: this.getHeaders() });
  }
}
