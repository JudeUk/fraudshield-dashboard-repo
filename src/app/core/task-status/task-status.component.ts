import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './task-status.component.html'
})
export class TaskStatusComponent implements OnDestroy {
  taskId = '';
  status: string | null = null;
  result: any = null;
  pollingSubscription: Subscription | null = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  checkStatus(): void {
    if (!this.taskId.trim()) {
      this.snackBar.open('Please enter a Task ID', 'Close', { duration: 3000 });
      return;
    }

    this.http.get<any>(`/api/task-status/${this.taskId}/`).subscribe({
      next: (res) => {
        this.status = res.state;
        this.result = res.result;

        if (res.state !== 'PENDING' && this.pollingSubscription) {
          this.pollingSubscription.unsubscribe();
        }
      },
      error: () => {
        this.snackBar.open('Failed to fetch task status', 'Close', { duration: 3000 });
      }
    });
  }

  startPolling(): void {
    if (this.pollingSubscription) this.pollingSubscription.unsubscribe();
    this.checkStatus(); // initial fetch
    this.pollingSubscription = interval(3000).subscribe(() => this.checkStatus());
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
