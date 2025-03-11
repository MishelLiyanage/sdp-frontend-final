import { Routes } from '@angular/router';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';

export const dashboardsRoutes: Routes = [
  { path: 'schoolDashboard', component: SchoolDashboardComponent },
  { path: 'employeeDashboard', component: EmployeeDashboardComponent}
];