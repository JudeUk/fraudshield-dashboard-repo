import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FraudshieldApiService {
  private BASE_URL = 'http://localhost:8000/api';  // Adjust for prod

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/transactions/`);
  }

  getTaskStatus(taskId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/task-status/${taskId}/`);
  }

  trainModel(tenant_id: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/train-model/`, { tenant_id });
  }

  selectModel(tenant_id: number, model_id: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/select-model/`, { tenant_id, model_id });
  }

  listModels(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/models/`);
  }
}
