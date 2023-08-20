import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { SignatureService } from 'src/app/services/signature/signature.service';
import { UtilService } from 'src/app/services/util/util.service';
import { KeywordsSelectPage } from '../keywords-select/keywords-select.page';

@Component({
  selector: 'app-signature-form',
  templateUrl: './signature-form.page.html',
  styleUrls: ['./signature-form.page.scss'],
})
export class SignatureFormPage implements OnInit {
  signatureForm: FormGroup;
  @Input() selectedSignature: any;
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
      price: [0, Validators.compose([Validators.required])],
      startDate: [null, Validators.compose([Validators.required])],
      frequency: ['', Validators.compose([Validators.required])],
      status: ['ATIVO'],
      sendPush: [false],
      currency: [''],
      iconImage: [''],
      keywords: [[]]
    });
  }

  ngOnInit() {
    if (this.selectedSignature) {
      this.signatureForm.patchValue({
        id: this.selectedSignature.id,
        name: this.selectedSignature.name,
        description: this.selectedSignature.description ? this.selectedSignature.description : '',
        price: this.selectedSignature.price,
        startDate: this.util.formatDateString(this.selectedSignature.startDate, false),
        frequency: this.selectedSignature.frequency,
        status: this.selectedSignature.status,
        sendPush: this.selectedSignature.sendPush,
        keywords: this.selectedSignature.keywords ? this.selectedSignature.keywords : []
      });
    }
  }

  async save() {
    if (this.signatureForm.valid) {
      const loading = await this.loadingController.create();
      await loading.present();
      if (this.signatureForm.value.id > 0) {
        this.ss.update(this.signatureForm.getRawValue()).subscribe({
          next: () => {
            loading.dismiss();
            this.util.showToast('success', 'Assinatura atualizada com sucesso!');
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
            this.util.showToast('success', 'Assinatura criada com sucesso!');
            this.dismissModal(true);
          },
          error: () => {
            loading.dismiss();
            this.util.showToast('danger', 'Erro ao salvar assinatura, tente novamente.');
          },
        });
      }
    } else {
      this.util.showToast('danger', 'Preencha os campos obrigatórios');
    }
  }

  async addKeyword() {
    const keywordsModal = await this.modalController.create({ component: KeywordsSelectPage, componentProps: {currentKeywords: this.signatureForm.value.keywords }, presentingElement: await this.modalController.getTop() });
    keywordsModal.onDidDismiss().then((response: any) => {
      if (response && response.data) {

      }
    });
    return await keywordsModal.present();
  }

  deleteKeyword() {

  }

  dismissModal(reload = false) {
    this.modalController.dismiss(reload);
  }

}
