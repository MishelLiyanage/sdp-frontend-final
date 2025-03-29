import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private baseUrl = 'https://localhost:8083/orders';

  constructor(private http: HttpClient) {}

  /**
   * Fetch processed orders per month from backend API.
   * If API fails, return hardcoded data.
   */
  getProcessedOrders(): Observable<MonthlyOrdersData[]> {
    const hardcodedData: MonthlyOrdersData[] = [
      { month: 'Jan', orders: 120 },
      { month: 'Feb', orders: 150 },
      { month: 'Mar', orders: 180 },
      { month: 'Apr', orders: 130 },
      { month: 'May', orders: 170 },
      { month: 'Jun', orders: 160 },
      { month: 'Jul', orders: 200 },
      { month: 'Aug', orders: 210 },
      { month: 'Sep', orders: 190 },
      { month: 'Oct', orders: 220 },
      { month: 'Nov', orders: 230 },
      { month: 'Dec', orders: 250 }
    ];

    return this.http.get<MonthlyOrdersData[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Error fetching data, using hardcoded data:', error);
        return of(hardcodedData); // Return hardcoded data if API fails
      })
    );
  }
}
