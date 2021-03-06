import { NgModule } from '@angular/core';

import { AboutPageModule } from './about/about.module';
import { LoginPageModule } from './login/login.module';
import { PeoplePageModule } from './people/people.module';
import { PersonPageModule } from './person/person.module';
import { TabsPageModule } from './tabs/tabs.module';
import { TeamPageModule } from './team/team.module';
import { TeamsPageModule } from './teams/teams.module';

@NgModule({
  imports: [
    AboutPageModule,
    LoginPageModule,
    PeoplePageModule,
    PersonPageModule,
    TabsPageModule,
    TeamPageModule,
    TeamsPageModule
  ]
})
export class PagesModule {}
