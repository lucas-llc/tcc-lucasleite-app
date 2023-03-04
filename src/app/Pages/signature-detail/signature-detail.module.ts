import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignatureDetailPageRoutingModule } from './signature-detail-routing.module';

import { SignatureDetailPage } from './signature-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignatureDetailPageRoutingModule
  ],
  declarations: [SignatureDetailPage]
})
export class SignatureDetailPageModule {}
