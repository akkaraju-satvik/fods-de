import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/general/services/general.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData: { isLoggedIn: boolean, user: any; global_user: any } = {
    isLoggedIn: false,
    user: null,
    global_user: null
  };

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  phoneLoginForm: FormGroup = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    otp: new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')])
  });

  errorCode!: string | null;
  authOperation!: string;
  authMethod!: string;
  authStateSubscription!: Subscription;
  mode!: string;

  constructor(private auth: Auth, public http: HttpClient, public router: Router, private generalService: GeneralService) { }

  loginWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then((result: any) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  loginWithEmailPass() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    signInWithEmailAndPassword(this.auth, email, password).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error.code);
      this.errorCode = error.code;
      console.log(error);
    });
  }

  signupWithEmailPass() {
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    createUserWithEmailAndPassword(this.auth, email, password).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error.code);
      this.errorCode = error.code;
      console.log(error);
    });
  }

  checkUser(token: string) {
    return this.http.post(environment.auth_endpoint + '/login', { token: token }, {
      headers: {
        'module': 'delivery_executive'
      }
    });
  }

  createUser(token: string) {
    return this.http.post(environment.auth_endpoint + '/register', { token }, {
      headers: {
        'module': 'delivery_executive'
      }
    });
  }

  logout() {
    this.authData.isLoggedIn = false;
    localStorage.clear();
    this.auth.signOut().then((res) => {
      console.log(res);
      this.router.navigate(['/login']);
    });
  }

  checkLoginStatus() {
    const user = localStorage.getItem('user');
    const global_user = localStorage.getItem('global_user');
    const token = localStorage.getItem('token');
    if (user && token && global_user) {
      this.authData.isLoggedIn = true;
      this.authData.user = JSON.parse(user);
      this.authData.global_user = JSON.parse(global_user);
      this.phoneLoginForm.reset();
      this.loginForm.reset();
      this.signupForm.reset();
    } else {
      this.authData.isLoggedIn = false;
      this.authData.user = null;
      this.router.navigate(['/login']);
      this.logout();
    }
  }

  loginWithPhone() {
    console.log('loginWithPhone');
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-btn', {
      'size': 'invisible',
      'callback': (response: any) => {
        console.log(response);
      }
    }, this.auth);
    console.log(window.recaptchaVerifier);
    const phoneNumber = this.phoneLoginForm.get('phone')?.value;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);
    signInWithPhoneNumber(this.auth, '+91' + phoneNumber, appVerifier).then((confirmationResult) => {
      console.log(confirmationResult);
      window.confirmationResult = confirmationResult;
    }).catch((error) => {
      debugger;
      console.log(error);
    });
  }

  submitOTP() {
    window.confirmationResult.confirm(this.phoneLoginForm.get('otp')?.value).then((result: any) => {
      console.log(result);
    }).catch((error: any) => {
      console.log(error);
    });
  }

}
