import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private baseUrl = 'https://localhost:8083/orders/distribution';

  constructor(private http: HttpClient) {}

  getOrderDistribution(): Observable<OrderCategoryData[]> {
    const hardcodedData: OrderCategoryData[] = [
      { category: 'Grade 5 Scholarship Sinhala', percentage: 35 },
      { category: 'Grade 5 Scholarship Tamil', percentage: 25 },
      { category: 'Grade 4 Scholarship Sinhala', percentage: 20 },
      { category: 'Grade 4 Scholarship Tamil', percentage: 10 },
      { category: 'Grade 3 Scholarship Sinhala', percentage: 7 },
      { category: 'Grade 3 Scholarship Tamil', percentage: 3 }
    ];

    return this.http.get<OrderCategoryData[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Failed to fetch distribution data:', error);
        return of(hardcodedData);
      })
    );
  }
}
