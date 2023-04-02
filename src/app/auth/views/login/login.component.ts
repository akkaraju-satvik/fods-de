import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneralService } from 'src/app/general/services/general.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginModal = false;
  signupModal = false;

  hamburgerMenuItems = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/']
    },
    {
      label: 'Manage Restaurant',
      url: 'http://localhost:4201',
      target: '_blank',
      icon: 'pi pi-fw pi-pencil'
    }
  ];
  phoneLogin: boolean = false;
  submittedPhoneNumber: boolean = false;
  submittedOTP: boolean = false;

  constructor(public authService: AuthService, public generalService: GeneralService) { }

  ngOnInit(): void {
  }

  authOperation(operation: string, method: string) {
    this.authService.authOperation = operation;
    this.authService.authMethod = method;
    if (operation === 'login') {
      if (method === 'google') {
        this.authService.loginWithGoogle();
      } else if (method === 'email-pass') {
        this.authService.loginWithEmailPass();
      } else if (method === 'phone') {
        this.phoneLogin = true;
      } else if (method === 'send-otp') {
        this.submittedPhoneNumber = true;
        this.submittedOTP = false;
        this.authService.loginWithPhone();
      }
    } else if (operation === 'signup') {
      console.log(method);
      if (method === 'google') {
        this.authService.loginWithGoogle();
      } else if (method === 'email-pass') {
        this.authService.signupWithEmailPass();
      } else if (method === 'phone') {
        this.phoneLogin = true;
      } else if (method === 'send-otp') {
        this.submittedPhoneNumber = true;
        this.submittedOTP = false;
        this.authService.mode = 'signup/phone';
        this.authService.loginWithPhone();
      }
    }
  }

  closeModal(modal: string) {
    if (modal === 'login') {
      this.authService.loginForm.reset();
      this.loginModal = false;
    } else if (modal === 'signup') {
      this.authService.signupForm.reset();
      this.signupModal = false;
    }
    this.submittedPhoneNumber = false;
    this.submittedOTP = false;
    this.authService.phoneLoginForm.reset();
  }

  ngOnDestroy(): void {
    this.authService.authStateSubscription.unsubscribe();
  }

}