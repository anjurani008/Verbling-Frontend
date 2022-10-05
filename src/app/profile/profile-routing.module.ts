import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ProfileComponent,
  // }
  {
		path: 'view',
		component: ProfileComponent
  },
  {
		path: 'edit',
		component: EditProfileComponent
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
