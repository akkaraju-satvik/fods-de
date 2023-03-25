import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarModule } from 'primeng/sidebar';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SidebarModule
  ]
})
export class GeneralModule { }
