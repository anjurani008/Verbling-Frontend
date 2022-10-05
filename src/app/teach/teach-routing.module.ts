import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachComponent } from './teach/teach.component';

const routes: Routes = [ 
    {
      path: '',
      component:TeachComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachRoutingModule { }
