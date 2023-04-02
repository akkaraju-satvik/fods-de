import { Component, Input } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'de-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() items!: MenuItem[];
  user_name = this.authService.authData?.user?.full_name || '';
  sideMenu: boolean = false;

  constructor(public generalService: GeneralService, public authService: AuthService, private primengconfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengconfig.ripple = true;
  }
}
