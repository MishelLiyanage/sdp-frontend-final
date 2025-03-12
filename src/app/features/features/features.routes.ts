import { Routes } from '@angular/router';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { UpdateSchoolProfileComponent } from './update-school-profile/update-school-profile.component';

export const featuresRoutes: Routes = [
  { path: 'placeOrder', component: PlaceOrderComponent },
  { path: 'myOrders', component: MyOrdersComponent },
  { path: 'updateSchoolProfile', component: UpdateSchoolProfileComponent}
];