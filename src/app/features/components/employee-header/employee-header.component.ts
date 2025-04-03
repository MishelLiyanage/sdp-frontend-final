import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-employee-header',
  imports: [],
  templateUrl: './employee-header.component.html',
  styleUrl: './employee-header.component.scss'
})
export class EmployeeHeaderComponent {
  // Boolean to toggle the menu
  isMenuOpen = false;
  isScrolled = false;

  constructor() { }

  ngOnInit(): void {
  }

  // Method to toggle the menu
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }

}
