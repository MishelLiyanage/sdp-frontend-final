import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/school.model';
import { SchoolDetails } from '../models/school-details.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private apiUrlforGetSchools = 'http://localhost:8083/school/all';
  private apiUrlforUpdateSchool = 'http://localhost:8083/school/updateSchool';
  private baseUrl = 'http://localhost:8083/school';

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

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.apiUrlforGetSchools, { headers: this.getHeaders() });
  }

  updateSchool(school: SchoolDetails) {
    return this.http.patch<any>(this.apiUrlforUpdateSchool, school, { headers: this.getHeaders() });
  }

  deleteSchool(schoolEmail: String) {
    return this.http.delete<void>(`${this.baseUrl}/${schoolEmail}`, { headers: this.getHeaders() });
  }
}
