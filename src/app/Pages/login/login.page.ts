import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonRouterOutlet, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilService } from 'src/app/services/util/util.service';
import { UserFormPage } from '../user-form/user-form.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    public as: AuthService,
    public formBuilder: FormBuilder,
    public util: UtilService,
    public loadingController: LoadingController,
    public navController: NavController,
    private routerOutlet: IonRouterOutlet,
    public modalController: ModalController
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  async login() {
    if (this.loginForm.valid) {
      const loading = await this.loadingController.create();
      await loading.present();
      this.as.doLogin(this.loginForm.getRawValue()).subscribe({
        next: (data) => {
          loading.dismiss();
          if (data && data.token) {
            this.util.setJWT(data.token);
            this.as.authUser.next({ value: data.token, valid: true });
            this.navController.navigateRoot('tabs');
          }
        },
        error: () => {
          loading.dismiss();
          this.util.showToast('danger', 'Usuário ou senha inválidos.');
        }
      })
    }
  }

  async showForm() {
    const formModal = await this.modalController.create({
      component: UserFormPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    formModal.onDidDismiss().then((response: any) => {
      if (response && response.data) {

      }
    });
    return await formModal.present();
  }

}
