import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaperProcessingService } from '../../../services/paper-processing.service';

@Component({
  selector: 'app-view-summary',
  imports: [CommonModule],
  templateUrl: './view-summary.component.html',
  styleUrl: './view-summary.component.scss'
})
export class ViewSummaryComponent implements OnInit {
  payload: any;

  constructor(private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    this.payload = nav?.extras?.state?.['payload'];
  }

  ngOnInit(): void {
    console.log(" ***************** " + this.payload.order.registeredNo);
    if (!this.payload) {
      alert('No order summary available');
      this.router.navigate(['/process-order']);
    }
  }

  printPage() {
    window.print();
  }

  goToProcessOrder() {
    this.router.navigate(['/features/processOrders']);
  }
}
