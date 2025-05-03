import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Import provideHttpClient
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from './enviroments/environment';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Zone.js configuration
    provideRouter(routes), // Router configuration
    provideHttpClient(withInterceptorsFromDi()), // HttpClient configuration
    provideAnimationsAsync(), // Animations support
    provideAnimationsAsync(), // Optional: Remove if duplicate
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Firebase app initialization
    provideStorage(() => getStorage()), // Firebase storage initialization
  ],
};