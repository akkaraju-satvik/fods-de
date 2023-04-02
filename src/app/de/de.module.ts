import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeRoutingModule } from './de-routing.module';
import { HomeComponent } from './views/home/home.component';
import { GeneralModule } from '../general/general.module';
import { PrimengModule } from '../primeng/primeng.module';
import { OrdersComponent } from './views/orders/orders.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';


@NgModule({
  declarations: [
    HomeComponent,
    OrdersComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DeRoutingModule,
    GeneralModule,
    PrimengModule
  ]
})
export class DeModule { }
