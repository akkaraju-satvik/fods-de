import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [ AuthGuard ], data: { path: 'login' }, title: 'FODS Delivery Executive Login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
