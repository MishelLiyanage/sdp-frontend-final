import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-starting-container',
  imports: [],
  templateUrl: './page-starting-container.component.html',
  styleUrl: './page-starting-container.component.scss'
})
export class PageStartingContainerComponent {
  @Input() title!: string;
  @Input() description!: string;
}
