import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { PersonPage } from './person';

@NgModule({
  declarations: [
    PersonPage,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(PersonPage),
  ],
  exports: [
    PersonPage
  ]
})
export class PersonPageModule {}
