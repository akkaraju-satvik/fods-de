import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class GeneralModule { }
