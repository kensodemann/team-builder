import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {
  teams: FirebaseListObservable<Array<any>>;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase) { }

  ionViewDidLoad() {
    this.teams = this.db.list('/teams');
  }
}
