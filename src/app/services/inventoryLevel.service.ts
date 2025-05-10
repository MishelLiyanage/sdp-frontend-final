import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface InventoryItem {
  model: string;
  level: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryLevelService {
  private baseUrl = 'http://localhost:8083/inventory/levels';

  constructor(private http: HttpClient) {}

  getInventoryLevels(): Observable<InventoryItem[]> {
    const sampleData: InventoryItem[] = [
      { model: 'Grade 10 Maths', level: 120 },
      { model: 'Grade 11 Science', level: 40 },
      { model: 'Grade 10 History', level: 25 },
      { model: 'Grade 11 English', level: 90 },
      { model: 'Grade 10 Sinhala', level: 60 }
    ];

    return this.http.get<InventoryItem[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Failed to fetch inventory levels:', error);
        return of(sampleData);
      })
    );
  }
}
