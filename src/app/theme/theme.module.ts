import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeRoutingModule } from './theme-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, LayoutComponent],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    MaterialModule
  ]
})
export class ThemeModule { }
