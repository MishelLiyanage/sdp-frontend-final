import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';

@Injectable({
    providedIn: 'root'
})
export class PrintingProgressService {

    private baseUrl = 'http://localhost:8083'; // Adjust the base URL as needed

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

    // GET a specific printing task by ID
    getPrintingTask(taskId: number): Observable<any> {
        console.log('Fetching task with ID:', taskId); // Debugging line to check the task ID
        return this.http.get<any>(`${this.baseUrl}/printing-progress/${taskId}`, { headers: this.getHeaders() });
    }

    // UPDATE a printing task
    updatePrintingTask(task: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/printing-progress/update-printing`, task, { headers: this.getHeaders() });
    }

    addToInventory(inventory: Inventory) {
        console.log('Adding to inventory:', inventory);
        return this.http.post(`${this.baseUrl}/inventory/add`, inventory, { headers: this.getHeaders() });
    }

    getPrintingProgressByTaskId(taskId: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/printing-progress/${taskId}`, { headers: this.getHeaders() });
    }
}