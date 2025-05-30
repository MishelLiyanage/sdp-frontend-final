import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from '../models/order.model';
import { OrderDetails } from '../models/order-details.model';

@Injectable({
    providedIn: 'root'
})
export class ProcessOrderService {
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

    getScholarshipTamilOrders(): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/processOrder/pending-scholarship-tamil`, { headers: this.getHeaders() });
    }

    getGrade3ScholarshipTamilOrders(): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/processOrder/pending-grade3-scholarship-tamil`, { headers: this.getHeaders() });
    }

    getOrderDetails(orderId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/processOrder/order-details/${orderId}`, { headers: this.getHeaders() });
    }

    saveOrderAndSchoolDetails(payload: any): Observable<any> {
        console.log("order payload 123456 ", payload);
      return this.http.post(`${this.baseUrl}/processOrder/save`, payload, { headers: this.getHeaders() });
    }
}