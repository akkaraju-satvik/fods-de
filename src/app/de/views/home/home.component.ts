import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GeneralService } from 'src/app/general/services/general.service';

@Component({
  selector: 'de-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public authService: AuthService, public generalService: GeneralService, public router: Router) { }

}
