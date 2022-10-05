import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { ListingComponent } from './listing/listing.component';
import { DetailComponent } from './detail/detail.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ListingComponent, DetailComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BlogModule { }
