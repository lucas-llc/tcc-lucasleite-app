import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { SignatureService } from 'src/app/services/signature/signature.service';
import { SignatureFormPage } from '../signature-form/signature-form.page';

@Component({
  selector: 'app-signature',
  templateUrl: 'signature.page.html',
  styleUrls: ['signature.page.scss']
})
export class SignaturePage implements OnInit {

  constructor(
    public ss: SignatureService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit(): void {
    this.listSignatures();
  }

  listSignatures() {
    this.ss.list().subscribe(() => {});
  }

  async openFormModal() {
    const formModal = await this.modalController.create({
      component: SignatureFormPage,
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