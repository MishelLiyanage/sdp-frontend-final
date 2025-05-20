import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.model';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
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

    savePayment(paymentDetails: Payment) {
        const headers = this.getHeaders();
        console.log('Payment Details:', paymentDetails); // Debugging line to check the payment details
        return this.http.post(`${this.baseUrl}/payment/`, paymentDetails, { headers });
    }

    uploadPaymentSlip(file: File, userId: number, orderId: string, amount: number, paymentMethod: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString());
    formData.append('orderId', orderId);
    formData.append('amount', amount.toString());
    formData.append('paymentMethod', paymentMethod);

    return this.http.post(`${this.baseUrl}/paymentSlip/upload-slip`, formData, { headers: this.getHeaders() });
  }
}