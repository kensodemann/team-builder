import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { PersonPage } from '../person/person';

@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage {
  people: FirebaseListObservable<Array<any>>;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase) { }

  ionViewDidLoad() {
    this.people = this.db.list('/people');
  }

  editPerson(person: any): void {
    this.navCtrl.push(PersonPage, { key: person.$key });
  }
}
