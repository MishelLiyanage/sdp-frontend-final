import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './features/components/footer/footer.component';
import { EmployeeHeaderComponent } from "./features/components/employee-header/employee-header.component";
import { PublicPageComponent } from "./features/public-page/public-page/public-page.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent,
    EmployeeHeaderComponent,
    PublicPageComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sdp-frontend-final';
}
