import { Component } from '@angular/core';
import { PageStartingContainerComponent } from '../../components/page-starting-container/page-starting-container.component';
import { HowToOrderComponent } from "../../components/how-to-order/how-to-order.component";

@Component({
  selector: 'app-school-dashboard',
  imports: [PageStartingContainerComponent, HowToOrderComponent],
  templateUrl: './school-dashboard.component.html',
  styleUrl: './school-dashboard.component.scss'
})
export class SchoolDashboardComponent {
  title: string = 'Welcome To School Portal';
  description: string = 'Empowering with seamless access to high-quality examination resources';
}
