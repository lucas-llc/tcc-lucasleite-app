import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signature-form',
  templateUrl: './signature-form.page.html',
  styleUrls: ['./signature-form.page.scss'],
})
export class SignatureFormPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
