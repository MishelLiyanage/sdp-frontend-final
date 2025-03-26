import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelPaper } from '../models/model-paper.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8083';

  constructor(private http: HttpClient) { }

  // Update Task
  updateTask(taskData: any): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Retrieve stored token
    console.log('Stored Token:', token);
    if (!token) {
      console.error('No token found in localStorage!');
      return new Observable<any>(); // Return an empty observable if no token
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Send token with "Bearer" prefix
    });

    return this.http.put<any>(`${this.baseUrl}/task/${taskData.id}`, taskData, { headers });
  }

  // Save Model Paper
  saveModelPaper(modelPaper: ModelPaper): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Retrieve stored token
    console.log('Stored Token:', token);
    if (!token) {
      console.error('No token found in localStorage!');
      return new Observable<any>(); // Return an empty observable if no token
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Send token with "Bearer" prefix
    });

    console.log('Headers:', headers.get('Authorization'));  // Verify header value

    return this.http.post<any>(`${this.baseUrl}/modelpaper/`, modelPaper, { headers });
  }

  // Save Task
  saveTask(task: Task): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Retrieve stored token
    console.log('Token:', token);
    if (!token) {
      console.error('No token found in localStorage!');
      return new Observable<any>(); // Return an empty observable if no token
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Send token with "Bearer" prefix
    });

    console.log('Headers:', headers.get('Authorization'));  // Verify header value
    console.log('Taskkkk:', task);  // Verify task data
     
    return this.http.post<any>(`${this.baseUrl}/task/`, task, { headers });
  }

  getTasks() {
    return this.http.get<{ success: boolean; tasks: Task[] }>('/api/tasks');
  }
}
