// revenue-by-payment-method.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface PaymentRevenue {
  method: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class RevenueByPaymentMethodService {
  private baseUrl = 'http://localhost:8083/payment/revenue';

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


  getRevenueData(): Observable<PaymentRevenue[]> {
    return this.http.get<PaymentRevenue[]>(this.baseUrl, { headers: this.getHeaders() });
  }
}

