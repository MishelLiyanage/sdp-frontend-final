import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PaperProcessingService {
    private baseUrl = 'http://localhost:8083/paper-processing/';

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

    submitPaperProcessing(paperProcessingData: { grade: any; category: any; fromPaperNo: number; toPaperNo: number; sequenceNo: number; }) {
        console.log("set paper numbers", paperProcessingData);
        return this.http.post(`${this.baseUrl}`, paperProcessingData, { headers: this.getHeaders() });
    }
}