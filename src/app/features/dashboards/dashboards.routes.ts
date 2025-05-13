import { Routes } from '@angular/router';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../auth/auth.guard';

export const dashboardsRoutes: Routes = [
  { path: 'schoolDashboard', component: SchoolDashboardComponent, canActivate: [AuthGuard] },
  { path: 'employeeDashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard] },
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]}
];