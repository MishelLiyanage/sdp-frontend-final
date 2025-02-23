import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { PublicationCardComponent } from '../../components/publication-card/publication-card.component';
import { MatCardModule } from '@angular/material/card';
import { HowToOrderComponent } from "../../components/how-to-order/how-to-order.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    RouterModule,
    PublicationCardComponent,
    MatCardModule,
    HowToOrderComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title: string = "St. Joseph's Institute";
  description: string = 'Your trusted partner in academic excellence';

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  publications = [
    { id: 1, image: 'src/assets/images/Picture1.png', name: 'Model Papers for All Grades' },
    { id: 2, image: 'assets/images/publication2.png', name: 'Science Past Papers' },
    { id: 3, image: 'assets/images/publication3.png', name: 'Mathematics Papers' },
    { id: 4, image: 'assets/images/publication4.png', name: 'History Exam Guides' }
  ];
  
}
