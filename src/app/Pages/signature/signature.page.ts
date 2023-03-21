import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController, PopoverController } from '@ionic/angular';
import { SignatureService } from 'src/app/services/signature/signature.service';
import { UtilService } from 'src/app/services/util/util.service';
import { SignatureFormPage } from '../signature-form/signature-form.page';
import { SignaturePopoverPage } from '../signature-popover/signature-popover.page';

@Component({
  selector: 'app-signature',
  templateUrl: 'signature.page.html',
  styleUrls: ['signature.page.scss']
})
export class SignaturePage implements OnInit {
  loading = false;
  constructor(
    public ss: SignatureService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public util: UtilService,
    public popoverController: PopoverController
  ) {}

  ngOnInit(): void {
    this.listSignatures();
    this.getTotals();
  }

  listSignatures() {
    this.loading = true;
    this.ss.list().subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getTotals() {
    this.ss.getTotals().subscribe({
      next: () => {

      },
      error: () => {

      }
    })
  }

  async openFormModal() {
    const formModal = await this.modalController.create({
      component: SignatureFormPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    formModal.onDidDismiss().then((response: any) => {
      if (response && response.data) {
        this.listSignatures();
        this.getTotals();
      }
    });
    return await formModal.present();
  }

  async presentPopover(event: any) {
    const popover = await this.popoverController.create({
      component: SignaturePopoverPage,
      event,
      translucent: true
    });
    return await popover.present();
  }
}
