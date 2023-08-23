import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'signature-form',
    loadChildren: () => import('./Pages/signature-form/signature-form.module').then( m => m.SignatureFormPageModule)
  },
  {
    path: 'signature-form/:id',
    loadChildren: () => import('./Pages/signature-form/signature-form.module').then( m => m.SignatureFormPageModule)
  },
  {
    path: 'user-form',
    loadChildren: () => import('./Pages/user-form/user-form.module').then( m => m.UserFormPageModule)
  },
  {
    path: 'user-form/:id',
    loadChildren: () => import('./Pages/user-form/user-form.module').then( m => m.UserFormPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signature-detail/:id',
    loadChildren: () => import('./Pages/signature-detail/signature-detail.module').then( m => m.SignatureDetailPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./Pages/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'signature-popover',
    loadChildren: () => import('./Pages/signature-popover/signature-popover.module').then( m => m.SignaturePopoverPageModule)
  },
  {
    path: 'keywords-select',
    loadChildren: () => import('./Pages/keywords-select/keywords-select.module').then( m => m.KeywordsSelectPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./Pages/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'category-detail/:id',
    loadChildren: () => import('./Pages/category-detail/category-detail.module').then( m => m.CategoryDetailPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
