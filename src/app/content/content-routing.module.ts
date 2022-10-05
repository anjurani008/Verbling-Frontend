import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
      path: 'privacy-policies',
      component: PrivacyPolicyComponent
    },
    {
      path: 'terms-conditions',
      component: TermsComponent
    },
    // {
    //   path: 'help',
    //   component: HelpComponent
    // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
