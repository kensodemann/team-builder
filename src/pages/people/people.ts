import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage implements OnInit {
  people: FirebaseListObservable<Array<any>>;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.people = this.db.list('/people');
  }
}
