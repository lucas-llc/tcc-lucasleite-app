import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
})
export class UserFormPage implements OnInit {
  userForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public us: UserService,
    public loadingController: LoadingController,
    public util: UtilService,
    public modalController: ModalController
  ) {
    this.userForm = this.formBuilder.group({
      id: [''],
      email: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      repeatPassword: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  async save() {
    if (this.userForm.valid) {
      if (this.userForm.value.password == this.userForm.value.repeatPassword) {
        const loading = await this.loadingController.create();
        await loading.present();
        if (this.userForm.value.id > 0) {
          this.us.update(this.userForm.getRawValue()).subscribe({
            next: () => {
              loading.dismiss();
              this.dismissModal(true);
            },
            error: () => {
              loading.dismiss();
              this.util.showToast('danger', 'Erro ao atualizar assinatura, tente novamente.');
            },
          });
        } else {
          this.us.create(this.userForm.getRawValue()).subscribe({
            next: () => {
              loading.dismiss();
              this.dismissModal(true);
            },
            error: () => {
              loading.dismiss();
              this.util.showToast('danger', 'Erro ao salvar assinatura, tente novamente.');
            },
          });
        }
      } else {
        this.util.showToast('danger', 'As senhas devem ser iguais.');
      }
    } else {
      this.util.showToast('danger', 'Preencha os campos obrigatórios.');
    }
  }

  dismissModal(reload = false) {
    this.modalController.dismiss(reload);
  }

}
