import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { Subscription } from 'rxjs/Subscription';

import { TeamPage } from '../team/team';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {
  private teamsSubscription: Subscription;
  teams: Array<any>;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase) { }

  ionViewDidEnter(): void {
    this.teamsSubscription = this.db.list('/teams')
      .subscribe(teams => this.teams = teams, err => console.log(err));
  }

  ionViewDidLeave(): void {
    this.teamsSubscription.unsubscribe();
  }

  editTeam(team: any): void {
    this.navCtrl.push(TeamPage, { key: team.$key });
  }
}
