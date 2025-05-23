import { Routes } from '@angular/router';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { UpdateSchoolProfileComponent } from './update-school-profile/update-school-profile.component';
import { ManageSchoolsComponent } from './manage-schools/manage-schools.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { UpdatePrintingProgressComponent } from './update-printing-progress/update-printing-progress.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { UpdateSchoolComponent } from './update-school/update-school.component';
import { ProcessOrderComponent } from './process-order/process-order.component';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';
import { SchoolRegistrationComponent } from './school-registration/school-registration.component';
import { SettingsComponent } from './settings/settings.component';
import { GenerateParcelListComponent } from './generate-parcel-list/generate-parcel-list.component';
import { ProcessOrderNavigatorComponent } from './process-order-navigator/process-order-navigator.component';
import { ProcessOrderGrade3ScholarshipTamilComponent } from './process-order-grade3-scholarship-tamil/process-order-grade3-scholarship-tamil.component';
import { ViewInventoryComponent } from './view-inventory/view-inventory.component';

export const featuresRoutes: Routes = [
  { path: 'placeOrder', component: PlaceOrderComponent },
  { path: 'myOrders', component: MyOrdersComponent },
  { path: 'updateSchoolProfile', component: UpdateSchoolProfileComponent},
  { path: 'manageSchools', component: ManageSchoolsComponent},
  { path: 'scrumboard', component: ScrumboardComponent},
  { path: 'updateTask', component: UpdateTaskComponent },
  { path: 'manageOrders', component: ManageOrdersComponent},
  { path: 'updatePrintingProgress/:taskId', component: UpdatePrintingProgressComponent},
  { path: 'updateOrder', component: UpdateOrderComponent},
  { path: 'updateSchool', component: UpdateSchoolComponent},
  { path: 'processOrders', component: ProcessOrderComponent },
  { path: 'processOrdersGrade3ScholarshipTamil', component: ProcessOrderGrade3ScholarshipTamilComponent },
  { path: 'processOrderNavigator', component: ProcessOrderNavigatorComponent},
  { path: 'registerEmployee', component: EmployeeRegistrationComponent },
  { path: 'manageEmployees', component: ManageEmployeesComponent},
  { path: 'schoolRegistration', component: SchoolRegistrationComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'generateParcelList', component: GenerateParcelListComponent},
  { path: 'viewInventory', component: ViewInventoryComponent}
];