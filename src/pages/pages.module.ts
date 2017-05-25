import { NgModule } from '@angular/core';

import { AboutPageModule } from './about/about.module';
import { PeoplePageModule } from './people/people.module';
import { TabsPageModule } from './tabs/tabs.module';
import { TeamsPageModule } from './teams/teams.module';

@NgModule({
  imports: [
    AboutPageModule,
    PeoplePageModule,
    TabsPageModule,
    TeamsPageModule
  ],
  exports: [
  ]
})
export class PagesModule {}
