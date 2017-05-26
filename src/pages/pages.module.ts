import { NgModule } from '@angular/core';

import { AboutPageModule } from './about/about.module';
import { PeoplePageModule } from './people/people.module';
import { PersonPageModule } from './person/person.module';
import { TabsPageModule } from './tabs/tabs.module';
import { TeamsPageModule } from './teams/teams.module';

@NgModule({
  imports: [
    AboutPageModule,
    PeoplePageModule,
    PersonPageModule,
    TabsPageModule,
    TeamsPageModule
  ]
})
export class PagesModule {}
