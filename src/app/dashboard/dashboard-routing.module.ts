import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherdashboardComponent } from './teacherdashboard/teacherdashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full',
		// canActivate: [AuthGuard],


	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'teacher',
		component:  TeacherdashboardComponent
	},
		{
		path: 'student',
		component: StudentDashboardComponent
	},{
		path: 'schedule',
		component: ScheduleComponent
	},

	// {
	// 	path: 'confirm-booking',
	// 	component: ConfirmBookingComponent
	// },
	// {
	// 	path: 'all-bookings',
	// 	component: AllBookingsComponent
	// },
	// {
	// 	path: 'photographerPayDetails',
	// 	component:AddPhototographerAccountComponent
	// },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
