import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCategoriesPage } from './my-categories';

@NgModule({
  declarations: [
    MyCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCategoriesPage),
  ],
})
export class MyCategoriesPageModule {}
