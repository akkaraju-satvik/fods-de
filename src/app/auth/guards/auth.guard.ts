import { Injectable } from '@angular/core';
import { Auth, authState, deleteUser } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/general/services/general.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, public authService: AuthService, public router: Router, private generalService: GeneralService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.data['path'] === 'login') {
      if (this.authService.authData.isLoggedIn) {
        this.router.navigate(['/de']);
        return false;
      }
      this.authService.authStateSubscription = authState(this.auth).subscribe((user) => {
        console.log(user);
        // this.authService.logout();
        user?.getIdToken().then((token) => {
          if (token) {
            console.log(token);
            if (this.authService.authOperation == 'login') {
              this.authService.checkUser(token).subscribe({
                next: (data: any) => {
                  this.authService.authData.isLoggedIn = true;
                  this.authService.errorCode = null;
                  this.authService.loginForm.reset();
                  console.log(data);
                  localStorage.setItem('user', JSON.stringify(data.data.global_user.delivery_executives));
                  delete data.data.global_user.delivery_executives;
                  localStorage.setItem('global_user', JSON.stringify(data.data.global_user))
                  localStorage.setItem('token', data.data.token);
                  this.authService.checkLoginStatus();
                  this.router.navigate(['/de']);
                },
                error: (error) => {
                  if (error.error.code === 'user-not-found') {
                    deleteUser(this.auth.currentUser!).then(() => {
                      this.authService.errorCode = 'user-not-found';
                      this.authService.logout();
                    });
                  } else {
                    this.authService.logout();
                  }
                }
              });
            } else if (this.authService.authOperation == 'signup') {
              this.authService.createUser(token).subscribe({
                next: (data: any) => {
                  this.authService.authData.isLoggedIn = true;
                  this.authService.errorCode = null;
                  this.authService.signupForm.reset();
                  console.log(data);
                  localStorage.setItem('user', JSON.stringify(data.data.global_user.delivery_executives));
                  delete data.data.global_user.delivery_executives;
                  localStorage.setItem('global_user', JSON.stringify(data.data.global_user))
                  localStorage.setItem('token', data.data.token);
                  this.authService.checkLoginStatus();
                  this.router.navigate(['/de']);
                },
                error: (error) => {
                  console.log(error);
                  if (error.error.code === 'user-exists') {
                    deleteUser(this.auth.currentUser!).then(() => {
                      this.authService.errorCode = 'user-exists';
                      this.authService.logout();
                    });
                  }
                }
              });
            }
          }
        });
      });
    } else if (route.data['path'] === 'home') {
      if (!this.authService.authData.isLoggedIn) {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }

}
