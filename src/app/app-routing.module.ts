import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    // loadChildren: './theme/theme.module#ThemeModule',
    // loadChildren: 'app/theme/theme.module#ThemeModule',
    // loadChildren: () => ThemeModule,
    loadChildren: () =>import('./theme/theme.module').then((m) => m.ThemeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
