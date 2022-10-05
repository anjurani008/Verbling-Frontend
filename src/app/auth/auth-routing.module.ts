import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'forgot',
		component: ForgotPasswordComponent
	},
	// {
	// 	path: 'change-password',
	// 	component: ChangePasswordComponent
	// },
	{
		path: 'reset-password',
		component: ResetPasswordComponent
	},
	{
		path: 'signup',
		component: SignupComponent
	},
	{path:'', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
