import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { PaperProcessing } from '../models/paper-processing.model';
import { PaperProcessingDetails } from '../models/paper-processing-details.model';
import { NumberingCounterDetails } from '../models/numbering-counter-details.model';

@Injectable({
    providedIn: 'root'
})
export class PaperProcessingService {
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

    submitPaperProcessing(paperProcessingData: { grade: any; category: any; fromPaperNo: number; toPaperNo: number; sequenceNo: number; }) {
        console.log("set paper numbers", paperProcessingData);
        return this.http.post(`${this.baseUrl}/paper-processing/`, paperProcessingData, { headers: this.getHeaders() });
    }

    saveInitialCounter(counterData: { grade: any; category: any; initialCounterNumber: number; }) {
        console.log("Counter details :::::::::", counterData);
        return this.http.post<any>(`${this.baseUrl}/paper-numbering/save`, counterData, { headers: this.getHeaders() });
    }

    savePaperNumbering(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/paper-numbering/save`, data, { headers: this.getHeaders() });
    }

    getProcessingDetails(grade: string, category: string) {

        console.log("grade + category", grade, category);
        
        const params = { grade, category };
        return this.http.get<PaperProcessingDetails>(`${this.baseUrl}/paper-processing/getByGradeAndCategory`, {
            headers: this.getHeaders(),
            params
        });
    }


    getCounterNumber(grade: string, category: string) {
        const params = { grade, category };
        return this.http.get<NumberingCounterDetails>(`${this.baseUrl}/paper-numbering/getByGradeAndCategory`, {
            headers: this.getHeaders(),
            params
        });
    }
}