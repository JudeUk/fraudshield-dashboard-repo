// src/app/core/train-model/train-model.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-train-model',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './train-model.component.html',
})
export class TrainModelComponent {
  tenantId = 1; // Replace with actual tenant from auth later
  isLoading = false;
  taskId: string | null = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  trainModel() {
    this.isLoading = true;
    this.http.post<{ task_id: string }>(`/api/train-model/`, { tenant_id: this.tenantId })
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.taskId = res.task_id;
          this.snackBar.open('Model training started successfully!', 'Close', { duration: 3000 });
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open('Failed to trigger training.', 'Close', { duration: 3000 });
        }
      });
  }
}
