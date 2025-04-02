import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8083/employee'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No token found in localStorage!');
        throw new Error('Authentication token not found');
      }
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/names-with-department`, { headers: this.getHeaders() });
  }
}
