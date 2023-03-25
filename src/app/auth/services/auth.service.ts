import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authData: { isLoggedIn: boolean, user: any; } = {
    isLoggedIn: false,
    user: null,
  };

  errorCode!: string | null;
  errorModal!: boolean;


  authStateSubscription!: Subscription;

  constructor(public auth: Auth, public router: Router, private http: HttpClient) { }

  removeToken() {
    return this.http.delete(`${environment.auth_endpoint}/logout`, {
      headers: {
        'module': 'business',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  logout(type: string = 'all') {
    this.auth.signOut().then((res) => {
      console.log(res);
      if(type === 'google-only') return;
      this.removeToken().subscribe((res) => {
        localStorage.clear();
        this.authData.user = null;
        this.authData.isLoggedIn = false;
        this.router.navigate(['/login']);
      })
    });
  }
}
