import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-page',
  imports: [],
  templateUrl: './public-page.component.html',
  styleUrl: './public-page.component.scss'
})
export class PublicPageComponent {
  constructor(private router: Router) { }

  isMenuOpen = false;

  goToLandingPage(): void {
    try {
      this.router.navigate(['/home/landingPage']);
    }
    catch (error) {
      console.error('Error navigating to landing page:', error);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
