import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeywordsSelectPage } from './keywords-select.page';

const routes: Routes = [
  {
    path: '',
    component: KeywordsSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeywordsSelectPageRoutingModule {}
