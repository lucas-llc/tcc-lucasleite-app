import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { UtilService } from './services/util/util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public as: AuthService,
    public navController: NavController,
    public us: UserService,
    public util: UtilService
  ) {
    this.as.doCheckLogin();
    this.as.authUser.subscribe(jwt => {
      if (jwt?.valid) {
        const user = localStorage.getItem('loggedUser');
        this.util.loggedUser = user != null ? JSON.parse(user) : '';
        if(!this.util.loggedUser) {
          this.us.getLoggedUser().subscribe({
            next: (data: any) => {
              localStorage.setItem('loggedUser', JSON.stringify(data));
              this.util.loggedUser = data;
            }
          })
        }
      } else {
        this.navController.navigateRoot('login', { animated: false, });
      }
    });
  }
}
