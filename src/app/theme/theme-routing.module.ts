import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
//   {
// 		path: 'auth',
// 		redirectTo: 'auth',
// 		pathMatch: 'full',
// 	},
	{
		path: 'auth',
		loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
		// loadChildren: '../auth/auth.module#AuthModule'
		// loadChildren: () => AuthModule,
		// component: LayoutComponent,
		// canActivate: [ActiveRouteGuard]
	},
	{

		path: '',
		component: LayoutComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full',
			},
	
			{
				path: 'dashboard',
				loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
				// loadChildren: '../dashboard/dashboard.module#DashboardModule'
				// loadChildren: () => DashboardModule,
			},
			// {
			// 	path: 'users',
			// 	loadChildren: () => import('../users/users.module').then((m) => m.UsersModule),
			// 	// loadChildren: '../users/users.module#UsersModule'
			// 	// loadChildren: () => UsersModule,
			// },

			// {
			// 	path: 'category',
			// 	loadChildren: () => import('../category/category.module').then((m) => m.CategoryModule),
			// 	// loadChildren: () => CategoryModule,
			// 	// loadChildren: '../category/category.module#CategoryModule'
			// },
			// {
			// 	path: 'faq',
			// 	loadChildren: () => import('../faq/faq.module').then((m) => m.FaqModule),
			// 	// loadChildren: '../faq/faq.module#FaqModule'
			// 	// loadChildren: () => FaqModule,
			// },

			// {
			// 	path: 'course',
			// 	loadChildren: () => import('../courses/courses.module').then((m) => m.CoursesModule),
			// 	// loadChildren: () => CoursesModule,
			// },

			// {
			// 	path: 'content',
			// 	loadChildren: () => import('../content/content.module').then((m) => m.ContentModule),
			// 	// loadChildren: () => ContentModule,

			// },


			// loadChildren: () => RolesModule,


			// {
			// 	path: 'blogs',
			// 	loadChildren: '../blogs/blogs.module#BlogsModule'
			// 	// loadChildren: () => BlogsModule,
			// },

			// {
			// 	path: 'payments',
			// 	loadChildren: '../payments/payments.module#PaymentsModule'
			// 	// loadChildren: () => PaymentsModule,
			// },
			// {
			// 	path: 'users',
			// 	// loadChildren: '../payments/payments.module#PaymentsModule'
			// 	loadChildren: () => UsersModule,
			// },
			// {
			// 	path: 'contents',
			// 	loadChildren: '../content/content.module#ContentModule'
			// 	// loadChildren: () => ContentModule,
			// },
			// {
			// 	path: 'photographers',
			// 	loadChildren: '../photographers/photographers.module#PhotographersModule'
			// 	// loadChildren: () => PhotographersModule,
			// },


			// {
			// 	path: 'bookings',
			// 	loadChildren: '../bookings/bookings.module#BookingsModule'
			// 	// loadChildren: () => BookingsModule,
			// },
			{
				path: 'home',
				loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
			},
			{
				path: 'content',
				loadChildren: () => import('../content/content.module').then((m) => m.ContentModule),
			},
			{
				path: 'blog',
				loadChildren: () => import('../blog/blog.module').then((m) => m.BlogModule),
			},
			{
				path: 'profile',
				loadChildren: () => import('../profile/profile.module').then((m) => m.ProfileModule),
				// loadChildren: '../profile/profile.module#ProfileModule'
				// loadChildren: () => ProfileModule,
			},

			{
				path: 'teachers',
				loadChildren: () => import('../teachers-listing/teachers-listing.module').then((m) => m.TeachersListingModule),
				// loadChildren: '../review/review.module#ReviewModule'
				// loadChildren: () => ReviewModule,
			},
			{
				path: 'teach',
				loadChildren: () => import('../teach/teach.module').then((m) => m.TeachModule),
				// loadChildren: '../review/review.module#ReviewModule'
				// loadChildren: () => ReviewModule,
			},
			{
				path: 'enterprise',
				loadChildren: () => import('../enterprise/enterprise.module').then((m) => m.EnterpriseModule),
				// loadChildren: '../faq/faq.module#FaqModule'
				// loadChildren: () => FaqModule, 
			},

			// {
			// 	path: 'plans',
			// 	loadChildren: '../plans/plans.module#PlansModule'
			// 	// loadChildren: () => PlansModule,
			// },
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
