import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-transaction-dashboard',
  standalone:true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  templateUrl: './transaction-dashboard.component.html',
  styleUrls: ['./transaction-dashboard.component.scss']
})
export class TransactionDashboardComponent implements OnInit {
  transactions: any[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.loading = true;
    this.http.get<any[]>('/api/transactions')
      .subscribe({
        next: (data) => {
          this.transactions = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching transactions:', err);
          this.loading = false;
        }
      });
  }
}