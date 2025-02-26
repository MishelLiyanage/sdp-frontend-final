import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recent-publications',
  imports: [MatCardModule],
  templateUrl: './recent-publications.component.html',
  styleUrl: './recent-publications.component.scss'
})
export class RecentPublicationsComponent {
  @Input() publicationName!: string;
}
