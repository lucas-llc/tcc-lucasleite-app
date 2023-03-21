import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, IonRouterOutlet, LoadingController, ModalController } from '@ionic/angular';
import { SignatureService } from 'src/app/services/signature/signature.service';
import { UtilService } from 'src/app/services/util/util.service';
import { SignatureFormPage } from '../signature-form/signature-form.page';

@Component({
  selector: 'app-signature-detail',
  templateUrl: './signature-detail.page.html',
  styleUrls: ['./signature-detail.page.scss'],
})
export class SignatureDetailPage implements OnInit {
  loading = true;
  selectedSignature: any;
  constructor(
    public util: UtilService,
    public route: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public ss: SignatureService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.util.getNavParams().subscribe(async (data: any) => {
      this.loading = true;
      if (data) {
        this.selectedSignature = data;
      } else {
        this.selectedSignature = { id: this.route.snapshot.paramMap.get('id') };
      }
    });
  }

  getSignature() {
    this.ss.get(this.selectedSignature.id).subscribe({
      next: (data) => {
        this.selectedSignature = data;
      }
    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        { text: 'Editar',  handler: () => { this.editSignature(); }},
        { text: this.selectedSignature.status == 'ATIVO' ? 'Inativar' : 'Ativar', handler: () => { this.changeStatus(); }},
        { text: 'Excluir', role: 'destructive', handler: () => { this.showAlertDelete(); }},
        { text: 'Cancelar', role: 'cancel'}
      ]
    });
    await actionSheet.present();
  }

  async editSignature() {
    const formModal = await this.modalController.create({
      component: SignatureFormPage,
      componentProps: {
        selectedSignature: this.selectedSignature
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    formModal.onDidDismiss().then((response: any) => {
      if (response && response.data) {
        this.getSignature();
        this.ss.getTotals().subscribe();
        this.ss.list().subscribe();
      }
    });
    return await formModal.present();
  }

  async showAlertDelete() {
    const alert = await this.alertController.create({
      header: 'Você confirma a exclusão dessa assinatura?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: () => {
            this.deleteSignature();
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteSignature() {
    const loading = await this.loadingController.create();
    this.ss.delete(this.selectedSignature.id).subscribe({
      next: () => {
        loading.dismiss();
        this.ss.getTotals().subscribe();
        this.ss.list().subscribe();
        this.util.navWithParams(null, 'tabs')
        this.util.showToast('success', 'Assinatura excluída com sucesso!');
      },
      error: () => {
        loading.dismiss();
        this.util.showToast('danger', 'Erro ao excluir assinatura, tente novamente.');
      }
    });
  }

  async changeStatus() {
    const loading = await this.loadingController.create();
    this.ss.changeStatus(this.selectedSignature.id).subscribe({
      next: () => {
        loading.dismiss();
        this.getSignature();
        this.ss.getTotals().subscribe();
        this.ss.list().subscribe();
        this.util.showToast('success', 'Assinatura atualizada com sucesso!');
      },
      error: () => {
        loading.dismiss();
        this.util.showToast('danger', 'Erro ao atualizar a assinatura, tente novamente.');
      }
    });
  }

}
