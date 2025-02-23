import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  constructor(private router: Router) {}

  goToLogin() {
    try {
      this.router.navigate(['/auth/login']);
      }
      catch (error) {
      throw new Error('Method not implemented.');
      }
  }

}
