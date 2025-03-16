import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8083/tasks'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  updateTask(taskData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskData.id}`, taskData);
  }
}
