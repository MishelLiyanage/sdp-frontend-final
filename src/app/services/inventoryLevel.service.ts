import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface InventoryItem {
  modelPaperName: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryLevelService {
  private baseUrl = 'http://localhost:8083/inventory/levels';

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

  getInventoryLevels(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.baseUrl, { headers: this.getHeaders() });
  }
}


