import { Routes } from '@angular/router';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { UpdateSchoolProfileComponent } from './update-school-profile/update-school-profile.component';
import { ManageSchoolsComponent } from './manage-schools/manage-schools.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';

export const featuresRoutes: Routes = [
  { path: 'placeOrder', component: PlaceOrderComponent },
  { path: 'myOrders', component: MyOrdersComponent },
  { path: 'updateSchoolProfile', component: UpdateSchoolProfileComponent},
  { path: 'manageSchools', component: ManageSchoolsComponent},
  { path: 'scrumboard', component: ScrumboardComponent},
  { path: 'updateTask/:id', component: UpdateTaskComponent },
  { path: 'manageOrders', component: ManageOrdersComponent}
];