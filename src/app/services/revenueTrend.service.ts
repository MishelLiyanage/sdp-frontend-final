import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface MonthlyRevenue {
  month: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class RevenueTrendService {
  private baseUrl = 'http://localhost:8083/payments/monthly-revenue';

  constructor(private http: HttpClient) {}

  getMonthlyRevenue(): Observable<MonthlyRevenue[]> {
    const hardcodedData: MonthlyRevenue[] = [
      { month: 'Jan', amount: 45000 },
      { month: 'Feb', amount: 60000 },
      { month: 'Mar', amount: 70000 },
      { month: 'Apr', amount: 85000 },
      { month: 'May', amount: 92000 }
    ];

    return this.http.get<MonthlyRevenue[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Failed to fetch monthly revenue data:', error);
        return of(hardcodedData);
      })
    );
  }
}
