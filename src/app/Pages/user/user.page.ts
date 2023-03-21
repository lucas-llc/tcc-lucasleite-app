import { Component } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';
import { UserFormPage } from '../user-form/user-form.page';

@Component({
  selector: 'app-user',
  templateUrl: 'user.page.html',
  styleUrls: ['user.page.scss']
})
export class UserPage {

  constructor(
    public util: UtilService,
    public us: UserService,
    public auth: AuthService,
    private routerOutlet: IonRouterOutlet,
    public modalController: ModalController
  ) {

  }

  async showForm() {
    const formModal = await this.modalController.create({
      component: UserFormPage,
      componentProps: {user: this.util.loggedUser},
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    formModal.onDidDismiss().then((response: any) => {
      if (response && response.data) {
        this.us.getLoggedUser().subscribe({
          next: (data) => {
            this.util.loggedUser = data;
            localStorage.setItem('loggedUser', JSON.stringify(data));
          }
        })
      }
    });
    return await formModal.present();
  }

  logout() {
    this.auth.logout();
  }

}
