import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  forgotForm: any;
  verificationForm: any;
  userForm: any;
  hasCheckedEmail = false;
  hasConfirmedCode = false;
  countDown: any;
  count: any;
  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    public us: UserService,
    public util: UtilService,
    public loadingController: LoadingController
  ) {
    this.forgotForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])]
    });
    this.verificationForm = formBuilder.group({
      code: ['', Validators.compose([Validators.required])]
    });
    this.userForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      code: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      repeatPassword: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async checkEmail() {
    if (this.forgotForm.valid) {
      const loading = await this.loadingController.create();
      await loading.present();
      this.us.checkUserEmail(this.forgotForm.value.email).subscribe({
        next: (data: boolean) => {
          loading.dismiss();
          if (data == true) {
            this.us.sendForgotCode(this.forgotForm.value.email).subscribe({
              next: () => {
                this.hasCheckedEmail = true
              },
              error: () => {
                this.util.showToast('danger', 'E-mail não encontrado');
              }
            });
          } else {
            this.util.showToast('danger', 'E-mail não encontrado');
          }
        },
        error: () => {
          loading.dismiss();
          this.util.showToast('danger', 'E-mail não encontrado');
        }
      })
    } else {
      this.util.showToast('danger', 'E-mail inválido');
    }
  }

  async confirmCode() {
    this.us.confirmCode(this.forgotForm.value.email, this.verificationForm.value.code).subscribe({
      next: (data) => {
        if(data === true) {
          this.hasConfirmedCode = true;
        }
      }
    })
  }

  async save() {
    if (this.userForm.valid) {
      if ((this.userForm.value.password && this.userForm.value.password == this.userForm.value.repeatPassword)) {
        const loading = await this.loadingController.create();
        await loading.present();
        this.us.updatePassword(this.userForm.getRawValue()).subscribe({
          next: () => {
            loading.dismiss();
            this.dismiss();
          },
          error: () => {
            loading.dismiss();
            this.util.showToast('danger', 'Erro ao atualizar, tente novamente.');
          },
        });
      } else {
        this.util.showToast('danger', 'As senhas devem ser iguais.');
      }
    } else {
      this.util.showToast('danger', 'Preencha os campos obrigatórios.');
    }
  }

}
