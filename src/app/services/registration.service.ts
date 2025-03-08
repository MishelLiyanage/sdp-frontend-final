import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchoolRegistration } from '../models/school-registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8082/school/sign-up'; // Backend API URL

  constructor(private http: HttpClient) {}

  registerSchool(schoolData: SchoolRegistration): Observable<any> {
    return this.http.post(this.apiUrl, schoolData, { responseType: 'text' });
  }
}
