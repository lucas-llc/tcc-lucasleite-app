import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignaturePopoverPageRoutingModule } from './signature-popover-routing.module';

import { SignaturePopoverPage } from './signature-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignaturePopoverPageRoutingModule
  ],
  declarations: [SignaturePopoverPage]
})
export class SignaturePopoverPageModule {}
