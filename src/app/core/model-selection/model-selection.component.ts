import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-model-selection',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './model-selection.component.html'
})
export class ModelSelectionComponent implements OnInit {
  models: any[] = [];
  selectedModelId: number | null = null;
  tenantId = 1; // Update this later from auth

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.http.get<any[]>(`/api/models/?tenant_id=${this.tenantId}`)
      .subscribe(data => this.models = data);
  }

  activateModel() {
    if (!this.selectedModelId) return;

    this.http.post('/api/select-model/', {
      tenant_id: this.tenantId,
      model_id: this.selectedModelId
    }).subscribe({
      next: () => {
        this.snackBar.open('Model activated successfully ✅', 'Close', { duration: 3000 });
      },
      error: (err) => {
        const errorMsg = err.error?.error || 'Activation failed ❌';
        this.snackBar.open(errorMsg, 'Close', { duration: 4000 });
      }
    });
  }
}
