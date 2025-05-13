import { Routes } from '@angular/router';
import { RegistrationComponent } from './features/auth/registration/registration.component';
import { AuthGuard } from './features/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'publicPage',
        loadChildren: () => import('./features/public-page/public-page/publicPage.routes').then(m => m.publicPageRoutes),
    },
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
    { path: '', redirectTo: 'publicPage', pathMatch: 'full' },
    { path: '**', redirectTo: 'publicPage', pathMatch: 'full' }, 
    { path: 'register', component: RegistrationComponent }
];
