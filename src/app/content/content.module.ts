import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';
import { HelpComponent } from './help/help.component';


@NgModule({
  declarations: [PrivacyPolicyComponent, TermsComponent, HelpComponent],
  imports: [
    CommonModule,
    ContentRoutingModule
  ]
})
export class ContentModule { }
