import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from '../models/order.model';
import { Payment } from '../models/payment.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
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

    calculateTotalAmount(orderItems: any[]): Observable<number> {
        console.log("order Items 123456 " + orderItems);
        return this.http.post<number>(`${this.baseUrl}/order/calculate-total`, orderItems, { headers: this.getHeaders() });
    }

    placeOrder(order: Order): Observable<any> {
        console.log("order summary 123456 " + order);
        return this.http.post(`${this.baseUrl}/order/place-order`, order, { headers: this.getHeaders() });
    }

    getPaperSetId(publicationName: string) {
        console.log(publicationName);
        return this.http.get<number>(`${this.baseUrl}/paperset/getIdByName`, { 
            params: { publicationName },
            headers: this.getHeaders()
        });
    }
    
}