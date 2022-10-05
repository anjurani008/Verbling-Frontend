import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  declarations: [ProfileComponent, EditProfileComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class ProfileModule { }
