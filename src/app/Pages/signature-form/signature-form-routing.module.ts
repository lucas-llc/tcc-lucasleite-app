import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignatureFormPage } from './signature-form.page';

const routes: Routes = [
  {
    path: '',
    component: SignatureFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignatureFormPageRoutingModule {}
