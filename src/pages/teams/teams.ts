import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage implements OnInit {
  teams: FirebaseListObservable<Array<any>>;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.teams = this.db.list('/teams');
  }
}
