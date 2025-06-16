import { Routes } from '@angular/router';
import { TransactionDashboardComponent } from './core/transaction-dashboard/transaction-dashboard.component';
import { ModelSelectionComponent } from './core/model-selection/model-selection.component';
import { TrainModelComponent } from './core/train-model/train-model.component';
import { TaskStatusComponent } from './core/task-status/task-status.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: TransactionDashboardComponent },
  { path: 'model-selection', component: ModelSelectionComponent },
  { path: 'train-model', component: TrainModelComponent },
  { path: 'task-status', component: TaskStatusComponent }
];
