import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-my-orders',
  imports: [MatTabsModule,
    MatTableModule
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {
  displayedColumns: string[] = ['publication', 'orderedDate', 'paymentStatus', 'amount', 'action'];
  displayedCompletedColumns: string[] = ['publication', 'orderedDate', 'paymentStatus', 'amount'];

  dataSource = [
    { publication: 'The Daily Times', orderedDate: '2024-02-28', paymentStatus: 'Paid', amount: '$10',},
    { publication: 'Science Journal', orderedDate: '2024-02-25', paymentStatus: 'Pending', amount: '$15', },
    { publication: 'Tech Monthly', orderedDate: '2024-02-20', paymentStatus: 'Paid', amount: '$12', },
    { publication: 'Tech Monthly', orderedDate: '2024-02-20', paymentStatus: 'Paid', amount: '$12', },
    { publication: 'Tech Monthly', orderedDate: '2024-02-20', paymentStatus: 'Paid', amount: '$12', },
    { publication: 'Tech Monthly', orderedDate: '2024-02-20', paymentStatus: 'Paid', amount: '$12', },
    { publication: 'Tech Monthly', orderedDate: '2024-02-20', paymentStatus: 'Paid', amount: '$12', }
  ];
}
