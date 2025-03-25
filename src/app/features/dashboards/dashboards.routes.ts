import { Routes } from '@angular/router';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const dashboardsRoutes: Routes = [
  { path: 'schoolDashboard', component: SchoolDashboardComponent },
  { path: 'employeeDashboard', component: EmployeeDashboardComponent},
  { path: 'adminDashboard', component: AdminDashboardComponent}
];