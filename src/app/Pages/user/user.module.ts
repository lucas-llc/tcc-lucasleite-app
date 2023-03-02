import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPage } from './user.page';
import { UserPageRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UserPageRoutingModule
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
