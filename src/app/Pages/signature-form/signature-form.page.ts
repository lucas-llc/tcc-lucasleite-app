import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { SignatureService } from 'src/app/services/signature/signature.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-signature-form',
  templateUrl: './signature-form.page.html',
  styleUrls: ['./signature-form.page.scss'],
})
export class SignatureFormPage implements OnInit {
  signatureForm: FormGroup;
  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    public ss: SignatureService,
    public loadingController: LoadingController,
    public util: UtilService
  ) {
    this.signatureForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.compose([Validators.required])],
      description: [''],
      price: [0],
      startDate: [null],
      frequency: [''],
      status: ['ATIVO'],
      sendPush: [false],
      currency: [''],
      iconImage: ['']
    });
  }

  ngOnInit() {
  }

  async save() {
    if (this.signatureForm.valid) {
      const loading = await this.loadingController.create();
      await loading.present();
      if (this.signatureForm.value.id > 0) {
        this.ss.update(this.signatureForm.getRawValue()).subscribe({
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
        this.ss.create(this.signatureForm.getRawValue()).subscribe({
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
    }
  }

  dismissModal(reload = false) {
    this.modalController.dismiss(reload);
  }

}
