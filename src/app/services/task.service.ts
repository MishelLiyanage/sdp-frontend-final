import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { ModelPaper } from '../models/model-paper.model';
import { PaperSets } from '../models/PaperSets.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8083';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    console.log('Token:', token); // Debugging line to check the token value
    if (!token) {
      console.error('No token found in localStorage!');
      throw new Error('Authentication token not found');
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Save Model Paper
  saveModelPaper(modelPaper: ModelPaper): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/modelpaper/`, modelPaper, { headers: this.getHeaders() });
  }

  savePaperSet(paperSet: PaperSets) {
    return this.http.post<any>(`${this.baseUrl}/paperset/`, paperSet, { headers: this.getHeaders() });
  }

  // Save Task
  saveTask(task: Task): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/task/`, task, { headers: this.getHeaders() });
  }

  // Get All Tasks
  getTasks(): Observable<{ success: boolean; tasks: Task[] }> {
    return this.http.get<{ success: boolean; tasks: Task[] }>(`${this.baseUrl}/task/getTasks`, { headers: this.getHeaders() });
  }

  // Get Task by ID
  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/task/${taskId}`, { headers: this.getHeaders() });
  }

  // Update Task Status
  updateTaskStatus(taskId: number, status: string): Observable<any> {
    const url = `${this.baseUrl}/task/${taskId}/status?status=${encodeURIComponent(status)}`;
    return this.http.patch(url, {}, { headers: this.getHeaders() });
  }

  // Update Task
  updateTask(taskData: any): Observable<any> {
    console.log('data:***', taskData); // Debugging line to check the task ID and data
    return this.http.put<any>(`${this.baseUrl}/task/assign`, taskData, { headers: this.getHeaders() });
  }

  getAssignmentByTaskId(taskId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/task/assignment/${taskId}`, { headers: this.getHeaders() });
  }
}
