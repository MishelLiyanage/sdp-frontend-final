import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/school.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private apiUrlforGetSchools = 'http://localhost:8083/school/all';
  private apiUrlforUpdateSchool = 'http://localhost:8083/school';

  constructor(private http: HttpClient) {}

  getSchools(): Observable<School[]> {
    const token = localStorage.getItem('accessToken'); // Retrieve stored token
    console.log('Stored Token:', token);

    if (!token) {
      console.error('No token found in localStorage!');
      return new Observable<School[]>(); // Return an empty observable if no token
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Send token with "Bearer" prefix
    });

    return this.http.get<School[]>(this.apiUrlforGetSchools, { headers });
  }

  updateSchool(schoolId: number, headers: HttpHeaders) {
    return this.http.get<any>(`your_backend_api${schoolId}`, { headers });
  }
}
