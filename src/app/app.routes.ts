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
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'register', component: RegistrationComponent }
];
