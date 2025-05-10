// revenue-by-payment-method.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface PaymentRevenue {
  method: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class RevenueByPaymentMethodService {
  private baseUrl = 'http://localhost:8083/payments/revenue';

  constructor(private http: HttpClient) {}

  getRevenueData(): Observable<PaymentRevenue[]> {
    const hardcodedData: PaymentRevenue[] = [
      { method: 'Online', amount: 120000 },
      { method: 'Bank Payment', amount: 95000 },
      { method: 'Post Office', amount: 60000 },
      { method: 'Hand Payment', amount: 45000 }
    ];

    return this.http.get<PaymentRevenue[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Failed to fetch revenue data:', error);
        return of(hardcodedData);
      })
    );
  }
}
