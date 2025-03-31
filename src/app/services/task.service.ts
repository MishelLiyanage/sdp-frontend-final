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

    if (!token) {
      console.error('No token found in localStorage!');

      return new Observable<any>(); // Return an empty observable if no token
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Send token with "Bearer" prefix
    });

    return this.http.post<any>(`${this.baseUrl}/modelpaper/`, modelPaper, { headers });
  }

  // Save Task
  saveTask(task: Task): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Retrieve stored token

    if (!token) {
      console.error('No token found in localStorage!');
      alert('Error: No token Found!');
      return new Observable<any>(); // Return an empty observable if no token
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Send token with "Bearer" prefix
    });

    return this.http.post<any>(`${this.baseUrl}/task/`, task, { headers });
  }

  getTasks(): Observable<{ success: boolean; tasks: Task[] }> {
    const token = localStorage.getItem('accessToken'); // Retrieve stored token

    if (!token) {
      console.error('No token found in localStorage!');
      return new Observable<{ success: boolean; tasks: Task[] }>(); // Return an empty observable if no token
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Send token with "Bearer" prefix
    });

    return this.http.get<{ success: boolean; tasks: Task[] }>(`${this.baseUrl}/task/getTasks`, { headers });
  }

  // // Method to fetch task details by the task's properties
  // getTaskId(task: Task): Observable<number> {
  //   return this.http.get<number>(`${this.baseUrl}/task/getTaskId/${task.modelPaper.id}`); // Adjust URL as needed
  // }

  updateTaskStatus(taskId: number, status: string): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Retrieve stored token
    
    if (!token) {
      console.error('No token found in localStorage!');
      return new Observable<any>(); // Return an empty observable if no token
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Send token with "Bearer" prefix
    });

    const requestPayload = {
      taskId: taskId, // Include taskId if needed
      status: status,
    };

    const url = `${this.baseUrl}/task/${taskId}/status?status=${encodeURIComponent(status)}`;

    return this.http.patch(url, {}, { headers });
  }
}
