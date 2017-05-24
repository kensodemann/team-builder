import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { PeoplePage } from '../people/people';
import { TeamsPage } from '../teams/teams';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PeoplePage;
  tab2Root = TeamsPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
