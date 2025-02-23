import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publication-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './publication-card.component.html',
  styleUrls: ['./publication-card.component.scss']
})
export class PublicationCardComponent {
  @Input() cardId!: number; // Input for card ID
  @Input() imageUrl!: string; // Input for image source
  @Input() publicationName!: string; // Input for publication name

  getCardColor(id: number): string {
    return id % 2 === 0 ? 'rgba(181, 249, 253, 0.4)' : 'rgba(255, 255, 255, 0.4)';
  }
}
