import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [EnterpriseComponent],
  imports: [
    CommonModule,MatExpansionModule,
    EnterpriseRoutingModule
  ]
})
export class EnterpriseModule { }
