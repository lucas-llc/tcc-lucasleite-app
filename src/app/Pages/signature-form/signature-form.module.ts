import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignatureFormPageRoutingModule } from './signature-form-routing.module';

import { SignatureFormPage } from './signature-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignatureFormPageRoutingModule
  ],
  declarations: [SignatureFormPage]
})
export class SignatureFormPageModule {}
