import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { OrdersComponent } from './views/orders/orders.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { path: 'home' } },
  { path: 'dashboard', component: DashboardComponent, data: { path: 'dashboard' } },
  { path: 'orders', component: OrdersComponent, data: { path: 'orders' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeRoutingModule { }
