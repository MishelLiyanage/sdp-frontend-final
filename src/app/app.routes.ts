import { Routes } from '@angular/router';
import { RegistrationComponent } from './features/auth/registration/registration.component';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./features/landing/home/home.routes').then(m => m.homeRoutes),
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes),
    },
    {
        path: 'dashboards',
        loadChildren: () => import('./features/dashboards/dashboards.routes').then(m => m.dashboardsRoutes),
    },
    {
        path: 'features',
        loadChildren: () => import('./features/features/features.routes').then(m => m.featuresRoutes),
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'register', component: RegistrationComponent }
];
