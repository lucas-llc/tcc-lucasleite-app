import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeywordsSelectPageRoutingModule } from './keywords-select-routing.module';

import { KeywordsSelectPage } from './keywords-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KeywordsSelectPageRoutingModule
  ],
  declarations: [KeywordsSelectPage]
})
export class KeywordsSelectPageModule {}
