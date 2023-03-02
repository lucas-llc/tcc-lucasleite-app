import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignaturePage } from './signature.page';
import { SignaturePageRoutingModule } from './signature-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SignaturePageRoutingModule
  ],
  declarations: [SignaturePage]
})
export class SignaturePageModule {}
