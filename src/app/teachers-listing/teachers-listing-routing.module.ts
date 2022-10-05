import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
		path: 'view',
		component: TeacherDetailComponent
  },
  {
		path: 'list',
		component: TeacherDashboardComponent
  },
  {
		path: 'checkout',
		component: CheckoutComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersListingRoutingModule { }
