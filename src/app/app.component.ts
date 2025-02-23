import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./features/components/header/header.component";
import { FooterComponent } from './features/components/footer/footer.component';
import { SchoolDashboardComponent } from "./features/dashboards/school-dashboard/school-dashboard.component";
// import { HomeComponent } from "./features/landing/home/home.component";
// import { PublicationCardComponent } from "./features/components/publication-card/publication-card.component";

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    // HomeComponent
    // PublicationCardComponent
    HeaderComponent,
    FooterComponent,
    SchoolDashboardComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sdp-frontend-final';
}
