import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateSchoolProfileService {
  private apiUrl = 'http://localhost:8083';

  constructor(private http: HttpClient) {}

  getCurrentUser(headers: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/account/currentuser`, { headers });
  }

  updateProfile(formData: any, headers: HttpHeaders): Observable<any> {
    console.log('Sending Token:', headers.get('Authorization')); // Debugging
    return this.http.put('http://localhost:8083/school/update-profile', formData, { headers });
  }
}
