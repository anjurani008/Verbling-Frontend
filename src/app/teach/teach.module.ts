import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachRoutingModule } from './teach-routing.module';
import { TeachComponent } from './teach/teach.component';
import { MaterialModule } from '../shared/material/material.module';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TeachComponent, FaqPageComponent],
  imports: [
    CommonModule,
    TeachRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TeachModule { }
