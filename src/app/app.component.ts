import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { GeneralService } from './general/services/general.service';

@Component({
  selector: 'de-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'delivery-exec';

  constructor(private authService: AuthService, private generalService: GeneralService) {  }

  ngOnInit() {
    this.authService.checkLoginStatus();
    if(window.innerWidth < 768) {
      this.generalService.mobileView = true;
    }
  }

}
