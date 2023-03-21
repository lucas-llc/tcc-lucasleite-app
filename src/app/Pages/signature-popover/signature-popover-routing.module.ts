import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignaturePopoverPage } from './signature-popover.page';

const routes: Routes = [
  {
    path: '',
    component: SignaturePopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignaturePopoverPageRoutingModule {}
