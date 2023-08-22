import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'signature',
        loadChildren: () => import('../signature/signature.module').then(m => m.SignaturePageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarPageModule)
      },
      {
        path: 'category',
        loadChildren: () => import('../category/category.module').then(m => m.CategoryPageModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then(m => m.UserPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/signature',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/signature',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
